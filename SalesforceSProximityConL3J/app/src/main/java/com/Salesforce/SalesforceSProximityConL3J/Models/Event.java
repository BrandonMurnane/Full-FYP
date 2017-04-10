package com.Salesforce.SalesforceSProximityConL3J.Models;

/**
 * Created by bmurnane on 22/03/2017.
 */

public class Event {

    private String key;
    private String description;
    private String owner;
    private String[] categoryKeys;

    public String getKey() {
        return key;
    }

    public String getDescription() {
        return description;
    }

    public String getOwner() {
        return owner;
    }

    public String[] getCategoryKeys() {
        return categoryKeys;
    }
}
