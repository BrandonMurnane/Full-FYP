package com.Salesforce.SalesforceSProximityConL3J.Models;

import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;

/**
 * Created by bmurnane on 22/03/2017.
 */

public class User {
    private String id;
    private String email;
    private String username;
    private String name;
    private String password;
    private String UserGroupKey;
    private ArrayList<String> categoryKeys;


    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getUsername() {
        return username;
    }

    public String getUserGroupKey() {
        return UserGroupKey;
    }

    public String getName() {
        return name;
    }

    public ArrayList<String> getCategoryKeys() {
        return categoryKeys;
    }


    public User(String email, String userName, ArrayList<String> categoryKeys, String password, String userGroupKey, String Name ) {
        this.email = email;
        this.username = userName;
        this.categoryKeys = categoryKeys;
        this.password = password;
        this.UserGroupKey = userGroupKey;
        this.name = Name;

    }
}
