package com.healthbooking.controller;

import com.healthbooking.model.Doctor;
import com.healthbooking.model.Patient;
import com.healthbooking.repository.DoctorRepository;
import com.healthbooking.repository.PatientRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;

    public AdminController(DoctorRepository doctorRepository, PatientRepository patientRepository) {
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
    }

    @GetMapping("/doctors")
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    @GetMapping("/patients")
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }
}
