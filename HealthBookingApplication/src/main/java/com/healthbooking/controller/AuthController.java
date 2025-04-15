package com.healthbooking.controller;

import com.healthbooking.model.Doctor;
import com.healthbooking.model.Patient;
import com.healthbooking.model.User;
import com.healthbooking.model.Admin;
import com.healthbooking.repository.DoctorRepository;
import com.healthbooking.repository.PatientRepository;
import com.healthbooking.repository.UserRepository;
import com.healthbooking.repository.AdminRepository;
import com.healthbooking.security.CustomUserDetailsService;
import com.healthbooking.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private CustomUserDetailsService userDetailsService;
    
    @Autowired
    private UserRepository userRepository;
    

    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final AdminRepository adminRepository;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    //private final UserDetailsService userDetailsService;

    public AuthController(DoctorRepository doctorRepository, PatientRepository patientRepository, AdminRepository adminRepository, 
                          PasswordEncoder passwordEncoder, JwtUtil jwtUtil, 
                          AuthenticationManager authenticationManager, CustomUserDetailsService userDetailsService) {
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
    }

    // ✅ Register Doctor
    @PostMapping("/register/doctor")
    public Map<String, String> registerDoctor(@RequestBody Doctor doctor) {
        doctor.setPassword(passwordEncoder.encode(doctor.getPassword()));
        doctor.setRole("ROLE_DOCTOR");
        doctorRepository.save(doctor);
        return Map.of("message", "Doctor registered successfully");
    }

//    // ✅ Register Patient
    @PostMapping("/register/patient")
    public Map<String, String> registerPatient(@RequestBody Patient patient) {
        patient.setPassword(passwordEncoder.encode(patient.getPassword()));
        patient.setRole("ROLE_PATIENT");
        patientRepository.save(patient);
        return Map.of("message", "Patient registered successfully");
    }
    
    @PostMapping("/register/admin")
    public Map<String, String> registerAdmin(@RequestBody Admin admin) {
        if (admin.getFullName() == null || admin.getFullName().trim().isEmpty()) {
            throw new RuntimeException("Full Name is required");
        }
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        admin.setRole("ROLE_ADMIN");
        
        System.out.println("Admin Details: " + admin.getEmail() + ", " + admin.getFullName());

        adminRepository.save(admin);
        return Map.of("message", "Admin registered successfully");
    }

    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody(required = false) Map<String, String> request) {
        if (request == null || !request.containsKey("email") || !request.containsKey("password")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Invalid request. Email and password are required."));
        }

        String email = request.get("email");
        String password = request.get("password");

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );

            UserDetails userDetails = userDetailsService.loadUserByEmail(email);
            Optional<User> user = userRepository.findByEmail(email);
            
            if (user.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "User not found"));
            }

            Long userId = user.get().getId();
            String token = jwtUtil.generateToken(userDetails, userId);
//            System.out.println(token);
//            System.out.println(userId);
            

            return ResponseEntity.ok(Map.of("token", token, "role", userDetails.getAuthorities().iterator().next().getAuthority(),"userId", userId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid email or password"));
        }
    }


}

////    ✅ Login API (Common for Doctor, Patient, Admin)
//    @PostMapping("/login")
//    public Map<String, String> login(@RequestBody Map<String, String> request) {
//        String email = request.get("email");
//        String password = request.get("password");
//        try {
//        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
//
////        // ✅ Use loadUserByEmail from CustomUserDetailsService
//        UserDetails userDetails = userDetailsService.loadUserByEmail(email);
//        System.out.println(email);
//        System.err.println(password);
////
//        String token = jwtUtil.generateToken(userDetails);
//
//        return Map.of("token", token);
//    }
//        catch (Exception e) {
//                    return Map.of("error", "Invalid email or password");
//        }
//    }

// ✅ Register Admin
//@PostMapping("/register/admin")
//public Map<String, String> registerAdmin(@RequestBody Admin admin) {
//  admin.setPassword(passwordEncoder.encode(admin.getPassword()));
//  admin.setRole("ROLE_ADMIN");
//  adminRepository.save(admin);
//  return Map.of("message", "Admin registered successfully");
//}