package com.healthbooking.model;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Getter
@Setter
@Table(name = "patients")
//@DiscriminatorValue("PATIENT")
public class Patient extends User { // ✅ Inherit from User

    @Column(name = "patient_name",nullable = false)
    private String patientName;
    
    @JsonManagedReference
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Appointment> appointments = new ArrayList<>(); // ✅ Initialize the list

    public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public List<Appointment> getAppointments() {
		return appointments;
	}

	public void setAppointments(List<Appointment> appointments) {
		this.appointments = appointments;
	}

	// ✅ Default Constructor (Required by JPA)
    public Patient() {
        super(); // Calls User's no-arg constructor
    }

    // ✅ Parameterized Constructor
    public Patient(String email, String password, String patientName) {
        super(email, password, "ROLE_PATIENT"); // ✅ Calls User constructor
        this.patientName = patientName;
        this.appointments = new ArrayList<>(); // ✅ Prevents NullPointerException
    }

    // ✅ Method to Add Appointments
    public void addAppointment(Appointment appointment) {
        appointment.setPatient(this);
        this.appointments.add(appointment);
    }
}


//package com.healthbooking.model;
//
//import jakarta.persistence.*;
//import java.util.Date;
//@Entity
//@Table(name = "patients")
//public class Patient extends User {
//
//    @Column(nullable = false)
//    private String patientName;
//    @Column(nullable = false, unique = true)
//    private String email;
//    private Date appointmentDate;
//    private String appointmentTime;
//    private String status; // Example: "Confirmed", "Pending"
//
//    // ✅ No-argument constructor required by JPA
//    public Patient() {
//        super(); // Ensures the parent class User is also properly initialized
//    }
//
//    public Patient(Long id, String username, String password, String role, String patientName, String email,
//                   Date appointmentDate, String appointmentTime, String status) {
//        super(id, username, password, role);
//        this.patientName = patientName;
//        this.email = email;
//        this.appointmentDate = appointmentDate;
//        this.appointmentTime = appointmentTime;
//        this.status = status;
//    }
//
//    public Patient(Long id, String username, String password, String role) {
//        super(id, username, password, role);
//    }
//
//    // Getters and Setters
//    public String getPatientName() {
//        return patientName;
//    }
//
//    public void setPatientName(String patientName) {
//        this.patientName = patientName;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public Date getAppointmentDate() {
//        return appointmentDate;
//    }
//
//    public void setAppointmentDate(Date appointmentDate) {
//        this.appointmentDate = appointmentDate;
//    }
//
//    public String getAppointmentTime() {
//        return appointmentTime;
//    }
//
//    public void setAppointmentTime(String appointmentTime) {
//        this.appointmentTime = appointmentTime;
//    }
//
//    public String getStatus() {
//        return status;
//    }
//
//    public void setStatus(String status) {
//        this.status = status;
//    }
//}
