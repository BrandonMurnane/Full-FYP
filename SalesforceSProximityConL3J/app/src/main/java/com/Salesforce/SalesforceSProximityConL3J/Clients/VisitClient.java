package com.Salesforce.SalesforceSProximityConL3J.Clients;

import com.Salesforce.SalesforceSProximityConL3J.Models.Visit;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.PATCH;
import retrofit2.http.POST;
import retrofit2.http.Path;
import retrofit2.http.Query;

/**
 * Created by bmurnane on 22/03/2017.
 */

public interface VisitClient {


    @POST("visits")
    Call<Visit> postVisit(@Body Visit visit);

}
