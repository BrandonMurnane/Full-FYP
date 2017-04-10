package com.Salesforce.SalesforceSProximityConL3J.Clients;

import com.Salesforce.SalesforceSProximityConL3J.Models.UserGroup;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import retrofit2.http.Query;

/**
 * Created by bmurnane on 22/03/2017.
 */

public interface UserGroupClient {

    @GET("userGroups")
    Call<List<UserGroup>> getUserGroups();

    @GET("userGroups/{userGroupKey}")
    Call<List<UserGroup>> UserGroupById(@Path("userGroupKey") String userGroupKey);
}
