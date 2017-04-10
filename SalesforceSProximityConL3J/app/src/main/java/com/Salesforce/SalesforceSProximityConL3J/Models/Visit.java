package com.Salesforce.SalesforceSProximityConL3J.Models;

import com.google.gson.annotations.SerializedName;

/**
 * Created by bmurnane on 22/03/2017.
 */

public class Visit {
    private String id;
    private String startTime;
    private String endTime;
    private String userGroupKey;
    private String booth;
    private String event;
    private String UserId;

    public String getId() {
        return id;
    }

    public String startTime() {
        return startTime;
    }

    public String endTime() {
        return endTime;
    }

    public String UserGroupKey() {
        return userGroupKey;
    }

    public String getBooth() {
        return booth;
    }

    public String getEvent() {
        return event;
    }

    public String UserId() {
        return UserId;
    }




    public Visit( String startTime,String endTime,String userGroupKey,String booth,String event,String UserId ) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.userGroupKey = userGroupKey;
        this.booth = booth;
        this.event = event;
        this.UserId = UserId;

    }

    public Visit(){

    }

}
