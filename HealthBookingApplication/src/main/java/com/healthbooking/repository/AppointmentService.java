package com.healthbooking.repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthbooking.model.Appointment;
import com.healthbooking.model.AppointmentStatus;

import jakarta.transaction.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public boolean rescheduleAppointment(Long Aid, LocalDate newDate, LocalTime newTime) {
        Optional<Appointment> optionalAppointment = appointmentRepository.findById(Aid);

        if (optionalAppointment.isPresent()) {
            Appointment appointment = optionalAppointment.get();
            
            // Ensure appointment is not already completed or canceled
            if (appointment.getStatus() == AppointmentStatus.COMPLETED || 
                appointment.getStatus() == AppointmentStatus.CANCELED) {
                throw new RuntimeException("Cannot reschedule a completed or canceled appointment.");
            }

            // Update appointment details
            appointment.setAppointmentDate(newDate);
            appointment.setAppointmentTime(newTime);
            appointment.setStatus(AppointmentStatus.RESCHEDULED);

            return appointmentRepository.save(appointment) != null;
        } else {
            throw new RuntimeException("Appointment not found.");
        }
    }
    

//    @Transactional
//    public void cancelAppointment(Long appointmentId) {
//        Optional<Appointment> appointmentOpt = appointmentRepository.findById(appointmentId);
//        
//        if (appointmentOpt.isPresent()) {
//            Appointment appointment = appointmentOpt.get();
//            appointment.setStatus("CANCELLED");  // Updating status to CANCELLED
//            appointmentRepository.save(appointment);
//        } else {
//            throw new RuntimeException("Appointment not found with ID: " + appointmentId);
//        }
//    }
}

