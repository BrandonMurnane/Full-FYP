package com.Salesforce.SalesforceSProximityConL3J.Clients;

import com.Salesforce.SalesforceSProximityConL3J.Models.Event;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import retrofit2.http.Query;

/**
 * Created by bmurnane on 22/03/2017.
 */

public interface EventClient {

    @GET("events")
    Call<List<Event>> getEvents(@Query("category") String category);

    @GET("events/{key}")
    Call<List<Event>> eventById(@Path("key") String key);

}

