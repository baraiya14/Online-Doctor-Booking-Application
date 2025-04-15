package com.healthbooking.controller;

import com.healthbooking.model.Doctor;
import com.healthbooking.repository.DoctorRepository;
import com.healthbooking.security.JwtUtil;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

//@RestController
//@RequestMapping("/doctor")
//public class DoctorController {
//	
//    private final DoctorRepository doctorRepository;
//
//    public DoctorController(DoctorRepository doctorRepository) {
//        this.doctorRepository = doctorRepository;
//    }
//
//    @GetMapping("/profile/{id}")
//    public Optional<Doctor> getDoctorProfile(@PathVariable Long id) {
//        return doctorRepository.findById(id);
//    }
//
//    @PutMapping("/update/{id}")
//    public Doctor updateDoctorProfile(@PathVariable Long id, @RequestBody Doctor updatedDoctor) {
//        return doctorRepository.findById(id).map(doctor -> {
//            doctor.setFullName(updatedDoctor.getFullName());
//            doctor.setSpecialization(updatedDoctor.getSpecialization());
//            doctor.setPhone(updatedDoctor.getPhone());
//            doctor.setAvailable(updatedDoctor.isAvailable());
//            return doctorRepository.save(doctor);
//        }).orElseThrow(() -> new RuntimeException("Doctor not found!"));
//    }
//}
import org.springframework.http.HttpHeaders;

@RestController
@RequestMapping("/doctors")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorController {
	
    private final DoctorRepository doctorRepository;
    private final JwtUtil jwtUtil;

    public DoctorController(DoctorRepository doctorRepository, JwtUtil jwtUtil) {
        this.doctorRepository = doctorRepository;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/profile")
    public Optional<Doctor> getDoctorProfile(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        // ✅ Extract token value (remove "Bearer " prefix)
        String jwt = token.substring(7);
        
        // ✅ Extract ID from token
        Long doctorId = jwtUtil.extractId(jwt);
        
        return doctorRepository.findById(doctorId);
    }
    
  
  @PutMapping("/update/{id}")
  public Doctor updateDoctorProfile(@PathVariable Long id, @RequestBody Doctor updatedDoctor) {
      return doctorRepository.findById(id).map(doctor -> {
          doctor.setFullName(updatedDoctor.getFullName());
          doctor.setSpecialization(updatedDoctor.getSpecialization());
          doctor.setPhone(updatedDoctor.getPhone());
          doctor.setAvailable(updatedDoctor.isAvailable());
          return doctorRepository.save(doctor);
      }).orElseThrow(() -> new RuntimeException("Doctor not found!"));
  }
}
