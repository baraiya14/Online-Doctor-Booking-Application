package com.healthbooking.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "admins")
//@DiscriminatorValue("ADMIN")
public class Admin extends User {

    @Column(nullable = false)
    private String fullName;

//    @Column(nullable = false, unique = true)
//    private String email;

    public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public Admin() {}

    public Admin(String email, String password, String fullName) {
        super(email, password, "ROLE_ADMIN");
        this.fullName = fullName;
       // this.email = email;
    }
}
