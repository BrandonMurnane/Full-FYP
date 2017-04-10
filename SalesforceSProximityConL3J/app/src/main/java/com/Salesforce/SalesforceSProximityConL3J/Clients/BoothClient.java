package com.Salesforce.SalesforceSProximityConL3J.Clients;

import com.Salesforce.SalesforceSProximityConL3J.Models.Booth;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import retrofit2.http.Query;

/**
 * Created by bmurnane on 22/03/2017.
 */

public interface BoothClient {

    @GET("booths")
    Call<List<Booth>> getBooths(@Query("category") String category);

    @GET("booths/{key}")
    Call<List<Booth>> boothById(@Path("key") String key);

}
