package com.Salesforce.SalesforceSProximityConL3J.Clients;

import com.Salesforce.SalesforceSProximityConL3J.Models.Category;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

/**
 * Created by bmurnane on 22/03/2017.
 */

public interface CategoryClient {

    @GET("categories")
    Call<List<Category>> getCategories();

    @GET("categories/{categoryKey}")
    Call<List<Category>> categoryByKey(@Path("categoryKey") String categoryKey);
}
