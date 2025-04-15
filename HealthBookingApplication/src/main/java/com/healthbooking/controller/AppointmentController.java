	package com.healthbooking.controller;
	
	import com.healthbooking.model.Appointment;
import com.healthbooking.model.AppointmentStatus;
import com.healthbooking.model.Doctor;
	import com.healthbooking.model.Patient;
	import com.healthbooking.repository.AppointmentRepository;
	import com.healthbooking.repository.AppointmentService;
	import com.healthbooking.repository.DoctorRepository;
	import com.healthbooking.repository.PatientRepository;
	import com.healthbooking.security.JwtUtil;
	
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.http.HttpHeaders;
	import org.springframework.http.HttpStatus;
	import org.springframework.http.ResponseEntity;
	import org.springframework.web.bind.annotation.*;
	
	import java.time.LocalDate;
	import java.time.LocalTime;
	import java.time.format.DateTimeFormatter;
	import java.util.HashSet;
	import java.util.List;
	import java.util.Map;
	import java.util.Optional;
	import java.util.Set;
	
	@RestController
	@RequestMapping("/appointments")
	public class AppointmentController {
	
	    @Autowired
	    private AppointmentRepository appointmentRepository;
	
	    @Autowired
	    private PatientRepository patientRepository;
	
	    @Autowired
	    private DoctorRepository doctorRepository;
	
	    @Autowired
	    private JwtUtil jwtUtil;
	    
	    @Autowired
	    private AppointmentService appointmentService;
	    
	    @PostMapping("/book")
	    public ResponseEntity<?> bookAppointment(
	            @RequestHeader("Authorization") String token,  // Extract JWT token from header
	            @RequestBody Map<String, Object> requestBody // Accept JSON data as a Map
	    ) {
	        try {
	            // 🔹 1. Validate Token
	            if (token == null || !token.startsWith("Bearer ")) {
	                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid token"));
	            }
	
	            // 🔹 2. Extract Patient ID from JWT
	            String jwt = token.substring(7); // Remove "Bearer " prefix
	            Long patientId = jwtUtil.extractId(jwt); // Extract ID from JWT
	
	            // 🔹 3. Extract fields from request body
	            Long doctorId = ((Number) requestBody.get("doctorId")).longValue(); // Extract doctorId safely
	            String appointmentDateStr = (String) requestBody.get("appointmentDate");
	            String timeStr  = (String) requestBody.get("time");
	            DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("h:mm a");
	            LocalTime appointmentTime = LocalTime.parse(timeStr, timeFormatter);
	
	            if (doctorId == null || appointmentDateStr == null || timeStr == null) {
	                return ResponseEntity.badRequest().body(Map.of("error", "Missing required fields"));
	            }
	
	            // 🔹 4. Parse Date
	            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	            LocalDate appointmentDate = LocalDate.parse(appointmentDateStr, dateFormatter);
	
	            Optional<Patient> patientOpt = patientRepository.findById(patientId);
	            Optional<Doctor> doctorOpt = doctorRepository.findById(doctorId);
	
	            if (patientOpt.isEmpty()) return ResponseEntity.badRequest().body(Map.of("error", "Patient not found!"));
	            if (doctorOpt.isEmpty()) return ResponseEntity.badRequest().body(Map.of("error", "Doctor not found!"));
	
	            if (!doctorOpt.get().isAvailable()) {
	                return ResponseEntity.badRequest().body(Map.of("error", "Doctor is not available!"));
	            }
	
	            Appointment appointment = new Appointment(patientOpt.get(), doctorOpt.get(), appointmentDate, appointmentTime, AppointmentStatus.PENDING);
	            appointmentRepository.save(appointment);
	
	            return ResponseEntity.ok(Map.of("message", "Appointment booked successfully!"));
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Error booking appointment"));
	        }
	    }
	 
	    @GetMapping("/patient/{patientId}")
	    public ResponseEntity<?> getAppointmentsByPatient(@PathVariable Long patientId, @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
	        if (token == null || !token.startsWith("Bearer ")) {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "No valid token found"));
	        }
	        String jwt = token.substring(7); // Extract token
	        Long extractedPatientId = jwtUtil.extractId(jwt); // Assuming this method extracts the patient ID from the token
	        System.out.println("Received Token: " + jwt);
	        System.out.println("Received patientId: " + extractedPatientId);
	
	        if (extractedPatientId == null || !extractedPatientId.equals(patientId)) {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid token or patient ID mismatch"));
	        }
	
	        Optional<Patient> patientOpt = patientRepository.findById(patientId);
	        if (patientOpt.isEmpty()) {
	            return ResponseEntity.badRequest().body(Map.of("error", "Patient not found!"));
	        }
	
	        try {
	            List<Appointment> appointments = appointmentRepository.findDistinctByPatient(patientOpt.get());
	            return ResponseEntity.ok(Map.of("appointments", appointments));
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body(Map.of("error", "Error fetching appointments"));
	        }
	    }
	        // ✅ 1. Reschedule Appointment
	        @PutMapping("/{appointmentId}/reschedule")
	        public ResponseEntity<String> rescheduleAppointment(
	                @PathVariable Long appointmentId,
	                @RequestParam String newDate,
	                @RequestParam String newTime) {
	
	            boolean success = appointmentService.rescheduleAppointment(appointmentId, LocalDate.parse(newDate), LocalTime.parse(newTime));
	
	            if (success) {
	                return ResponseEntity.ok("Appointment rescheduled successfully.");
	            } else {
	                return ResponseEntity.badRequest().body("Failed to reschedule appointment.");
	            }
	        }
	
	//        // ✅ 2. Cancel Appointment
	//        @PutMapping("/{appointmentId}/cancel")
	//        public ResponseEntity<String> cancelAppointment(@PathVariable Long appointmentId) {
	//            boolean success = appointmentService.cancelAppointment(appointmentId);
	//
	//            if (success) {
	//                return ResponseEntity.ok("Appointment canceled successfully.");
	//            } else {
	//                return ResponseEntity.badRequest().body("Failed to cancel appointment.");
	//            }
	//        }
	    }
	
	//✅ Book an Appointment
	//@PostMapping("/book")
	//public ResponseEntity<?> bookAppointment(
	//      @RequestParam Long patientId,
	//      @RequestParam Long doctorId,
	//      @RequestParam String appointmentDate,  
	//      @RequestParam String time  
	//) {
	//  try {
	//      DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	//      LocalDate parsedDate = LocalDate.parse(appointmentDate, dateFormatter);
	//
	//      Optional<Patient> patientOpt = patientRepository.findById(patientId);
	//      Optional<Doctor> doctorOpt = doctorRepository.findById(doctorId);
	//
	//      if (patientOpt.isEmpty()) return ResponseEntity.badRequest().body(Map.of("error", "Patient not found!"));
	//      if (doctorOpt.isEmpty()) return ResponseEntity.badRequest().body(Map.of("error", "Doctor not found!"));
	//
	//      Doctor doctor = doctorOpt.get();
	//      if (!doctor.isAvailable()) {
	//          return ResponseEntity.badRequest().body(Map.of("error", "Doctor is not available!"));
	//      }
	//
	//      Appointment appointment = new Appointment(
	//              patientOpt.get(), 
	//              doctor, 
	//              parsedDate, 
	//              time, 
	//              "PENDING"
	//      );
	//      appointmentRepository.save(appointment);
	//      return ResponseEntity.ok(Map.of("message", "Appointment booked successfully!"));
	//  } catch (Exception e) {
	//      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Error booking appointment"));
	//  }
	//}
	
	//
	//@PostMapping("/book")
	//public ResponseEntity<?> bookAppointment(
	//        @RequestHeader("Authorization") String token,  // Extract JWT token from header
	//        @RequestParam Long doctorId,
	//        @RequestParam String appointmentDate,
	//        @RequestParam String time
	//) {
	//    try {
	//        // 🔹 1. Validate Token
	//        if (token == null || !token.startsWith("Bearer ")) {
	//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid token"));
	//        }
	//
	//        // 🔹 2. Extract Patient ID from JWT
	//        String jwt = token.substring(7); // Remove "Bearer " prefix
	//        Long patientId = jwtUtil.extractId(jwt); // Extract ID from JWT
	//
	//        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	//        LocalDate parsedDate = LocalDate.parse(appointmentDate, dateFormatter);
	//
	//        Optional<Patient> patientOpt = patientRepository.findById(patientId);
	//        Optional<Doctor> doctorOpt = doctorRepository.findById(doctorId);
	//
	//        if (patientOpt.isEmpty()) return ResponseEntity.badRequest().body(Map.of("error", "Patient not found!"));
	//        if (doctorOpt.isEmpty()) return ResponseEntity.badRequest().body(Map.of("error", "Doctor not found!"));
	//
	//        if (!doctorOpt.get().isAvailable()) {
	//            return ResponseEntity.badRequest().body(Map.of("error", "Doctor is not available!"));
	//        }
	//
	//        Appointment appointment = new Appointment(patientOpt.get(), doctorOpt.get(), parsedDate, time, "PENDING");
	//        appointmentRepository.save(appointment);
	//
	//        return ResponseEntity.ok(Map.of("message", "Appointment booked successfully!"));
	//    } catch (Exception e) {
	//        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Error booking appointment"));
	//    }
	//}
