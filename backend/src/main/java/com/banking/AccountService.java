package com.banking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class AccountService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    private Account getCurrentAccount() {
        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return accountRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Account not found"));
    }

    public Map<String, Object> getBalance() {
        Account account = getCurrentAccount();

        Map<String, Object> response = new HashMap<>();
        response.put("balance", account.getBalance());

        return response;
    }

    public Map<String, Object> deposit(Map<String, String> request) {
        Account account = getCurrentAccount();

        BigDecimal amount;

        try {
            amount = new BigDecimal(request.get("amount"));
        } catch (Exception e) {
            throw new RuntimeException("Invalid deposit amount");
        }

        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("Deposit amount must be greater than zero");
        }

        account.setBalance(account.getBalance().add(amount));
        accountRepository.save(account);

        transactionRepository.save(
                Transaction.builder()
                        .account(account)
                        .type("DEPOSIT")
                        .amount(amount)
                        .timestamp(LocalDateTime.now())
                        .description("Money deposited")
                        .build()
        );

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Deposit successful");
        response.put("balance", account.getBalance());

        return response;
    }

    public Map<String, Object> withdraw(Map<String, String> request) {
        Account account = getCurrentAccount();

        BigDecimal amount;

        try {
            amount = new BigDecimal(request.get("amount"));
        } catch (Exception e) {
            throw new RuntimeException("Invalid withdrawal amount");
        }

        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("Withdrawal amount must be greater than zero");
        }

        if (account.getBalance().compareTo(amount) < 0) {
            throw new RuntimeException("Insufficient balance");
        }

        account.setBalance(account.getBalance().subtract(amount));
        accountRepository.save(account);

        transactionRepository.save(
                Transaction.builder()
                        .account(account)
                        .type("WITHDRAW")
                        .amount(amount)
                        .timestamp(LocalDateTime.now())
                        .description("Money withdrawn")
                        .build()
        );

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Withdrawal successful");
        response.put("balance", account.getBalance());

        return response;
    }

    public Map<String, Object> transfer(Map<String, String> request) {
        Account sender = getCurrentAccount();

        String receiverEmail = request.get("email");

        if (receiverEmail == null || receiverEmail.trim().isEmpty()) {
            throw new RuntimeException("Receiver email required");
        }

        if (sender.getUser().getEmail().equalsIgnoreCase(receiverEmail)) {
            throw new RuntimeException("Cannot transfer to your own account");
        }

        BigDecimal amount;

        try {
            amount = new BigDecimal(request.get("amount"));
        } catch (Exception e) {
            throw new RuntimeException("Invalid transfer amount");
        }

        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("Transfer amount must be greater than zero");
        }

        if (sender.getBalance().compareTo(amount) < 0) {
            throw new RuntimeException("Insufficient balance");
        }

        User receiverUser = userRepository.findByEmail(receiverEmail)
                .orElseThrow(() -> new RuntimeException("Receiver not found"));

        Account receiver = accountRepository.findByUser(receiverUser)
                .orElseThrow(() -> new RuntimeException("Receiver account not found"));

        sender.setBalance(sender.getBalance().subtract(amount));
        receiver.setBalance(receiver.getBalance().add(amount));

        accountRepository.save(sender);
        accountRepository.save(receiver);

        transactionRepository.save(
                Transaction.builder()
                        .account(sender)
                        .type("TRANSFER")
                        .amount(amount)
                        .timestamp(LocalDateTime.now())
                        .description("Transferred to " + receiverEmail)
                        .build()
        );

        transactionRepository.save(
                Transaction.builder()
                        .account(receiver)
                        .type("RECEIVED")
                        .amount(amount)
                        .timestamp(LocalDateTime.now())
                        .description("Received from " + sender.getUser().getEmail())
                        .build()
        );

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Transfer successful");
        response.put("balance", sender.getBalance());

        return response;
    }

    public List<Transaction> getHistory() {
        Account account = getCurrentAccount();
        return transactionRepository.findByAccountOrderByTimestampDesc(account);
    }
}