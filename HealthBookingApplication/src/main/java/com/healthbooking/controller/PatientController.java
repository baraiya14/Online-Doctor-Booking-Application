package com.healthbooking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthbooking.model.Doctor;
import com.healthbooking.model.Patient;
import com.healthbooking.repository.DoctorRepository;
import com.healthbooking.repository.PatientRepository;
import com.healthbooking.security.JwtUtil;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/patients")
@CrossOrigin(origins = "http://localhost:3000")
public class PatientController {
	@Autowired
	private final DoctorRepository  doctorRepository;
    private final PatientRepository patientRepository;
    
    private final JwtUtil jwtUtil;

    @Autowired
    public PatientController(PatientRepository patientRepository, JwtUtil jwtUtil, DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
		this.patientRepository = patientRepository;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getPatientProfile(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }

        String jwt = token.substring(7);
        Long patientId = jwtUtil.extractId(jwt);

        Optional<Patient> patient = patientRepository.findById(patientId);

        if (patient.isPresent()) {
            return ResponseEntity.ok(patient.get());
        } else {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Patient not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }
    
    @GetMapping("/doctors") // ✅ Updated endpoint name
    public List<Doctor> getAllDoctorNames(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
    	if (token == null || !token.startsWith("Bearer ")) {
            System.out.println("No valid token found");
        } else {
            String jwt = token.substring(7); // ✅ Extract token
          System.out.println("Received Token: " + jwt);
            Long doctorId = jwtUtil.extractId(jwt);
           System.out.println(doctorId);
        }
    	
    	
    		return doctorRepository.findAll();
//                               .stream()
//                               .map(Doctor::getFullName) // ✅ Extract only doctor names
//                               .collect(Collectors.toList());
    }
    
}
