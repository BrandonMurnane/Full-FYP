package com.Salesforce.SalesforceSProximityConL3J.Clients;


import com.Salesforce.SalesforceSProximityConL3J.Models.User;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;
import retrofit2.http.Query;

/**
 * Created by bmurnane on 22/03/2017.
 */

public interface UserClient {

    @GET("users/{username}")
    Call<User> userLogin(
            @Path("username") String username,
            @Query("password") String password);

    @POST("users")
    Call<User> postUser(@Body User user);
}
