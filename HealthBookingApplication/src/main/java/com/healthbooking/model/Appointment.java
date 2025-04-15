	package com.healthbooking.model;
	
	import java.time.LocalDate;
	import java.time.LocalTime;

	import com.fasterxml.jackson.annotation.JsonBackReference;

	import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
	
	@Entity
	@Getter
	@Setter
	@Table(name = "appointment")
//	@DiscriminatorValue("APPOINTMENT")
	public class Appointment {
	
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long Aid;
	
	    @ManyToOne(fetch = FetchType.LAZY)
	    @JsonBackReference
	    @JoinColumn(name = "patient_id", nullable = false) // Many Appointments belong to one Patient
	    private Patient patient;
	
	    @ManyToOne(fetch = FetchType.EAGER)
	    @JoinColumn(name = "doctor_id", nullable = false) // Each Appointment is linked to a Doctor
	    private Doctor doctor;
	
	    @Column(nullable = false)
	    private LocalDate appointmentDate;
	
	    @Column(nullable = false)
	    private LocalTime  appointmentTime; // e.g., "10:30 AM"
	
	    @Enumerated(EnumType.STRING)
	    private AppointmentStatus status;
	
	    public Appointment() {}
	
	    public Long getAid() {
			return Aid;
		}

		public void setAid(Long id) {
			this.Aid = Aid;
		}

		public Doctor getDoctor() {
			return doctor;
		}

		public void setDoctor(Doctor doctor) {
			this.doctor = doctor;
		}

		public LocalDate getAppointmentDate() {
			return appointmentDate;
		}

		public void setAppointmentDate(LocalDate appointmentDate) {
			this.appointmentDate = appointmentDate;
		}

		public LocalTime getAppointmentTime() {
			return appointmentTime;
		}

		public void setAppointmentTime(LocalTime appointmentTime) {
			this.appointmentTime = appointmentTime;
		}


		public Patient getPatient() {
			return patient;
		}
	
		 
		public Appointment(Patient patient, Doctor doctor, LocalDate appointmentDate, 
                LocalTime appointmentTime, AppointmentStatus status) {
  this.patient = patient;
  this.doctor = doctor;
  this.appointmentDate = appointmentDate;
  this.appointmentTime = appointmentTime;
  this.status = status;
}
	    public void setPatient(Patient patient) {
	        this.patient = patient;
	    }

		public void setStatus(AppointmentStatus rescheduled) {
			// TODO Auto-generated method stub
			
		}

		public AppointmentStatus getStatus() {
			// TODO Auto-generated method stub
			return null;
		}
	}
