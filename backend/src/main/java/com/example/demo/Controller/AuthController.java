package com.example.demo.Controller;

import com.example.demo.Service.MyUserDetailsService;
import com.example.demo.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private MyUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> loginData) {

        System.out.println("HERE");
        String username = loginData.get("username");
        String password = loginData.get("password");
        System.out.println(username);
        System.out.println(password);
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

        final UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        System.out.println(jwtUtil.generateToken(userDetails));
        return jwtUtil.generateToken(userDetails);
    }

    @PostMapping("/register")
    public String register(@RequestBody Map<String, String> userData) {
        userDetailsService.saveUser(userData.get("username"), userData.get("password"), "USER");
        return "User registered successfully";
    }
}
