package com.banking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/account")
@CrossOrigin(origins = "http://localhost:5173")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @GetMapping("/balance")
    public Map<String, Object> getBalance() {
        return accountService.getBalance();
    }

    @PostMapping("/deposit")
    public Map<String, Object> deposit(@RequestBody Map<String, String> request) {
        return accountService.deposit(request);
    }

    @PostMapping("/withdraw")
    public Map<String, Object> withdraw(@RequestBody Map<String, String> request) {
        return accountService.withdraw(request);
    }

    @PostMapping("/transfer")
    public Map<String, Object> transfer(@RequestBody Map<String, String> request) {
        return accountService.transfer(request);
    }

    @GetMapping("/history")
    public List<Transaction> history() {
        return accountService.getHistory();
    }
}