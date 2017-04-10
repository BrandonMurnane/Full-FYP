package com.Salesforce.SalesforceSProximityConL3J.Models;

/**
 * Created by bmurnane on 22/03/2017.
 */

public class Category {

    private String key;
    private String description;
    private String[] relatedCategories;

    public String[] getRelatedCategories() {
        return relatedCategories;
    }

    public String getDescription() {
        return description;
    }

    public String getKey() {
        return key;
    }

}
