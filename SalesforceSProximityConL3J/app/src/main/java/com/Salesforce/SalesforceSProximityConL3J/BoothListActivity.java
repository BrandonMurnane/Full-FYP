package com.Salesforce.SalesforceSProximityConL3J;

import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Toast;

import com.Salesforce.SalesforceSProximityConL3J.Clients.BoothClient;
import com.Salesforce.SalesforceSProximityConL3J.Models.Booth;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * Created by bmurnane on 10/04/2017.
 */



public class BoothListActivity extends BaseActivity {

    private ListView listView;
    private ArrayList<String> eventlist = new ArrayList<String>();
    private ArrayAdapter<String> adapter;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.content_event_list);

        listView = (ListView) findViewById(R.id.event_list_view);
        addDrawerItems();


    }

    private void addDrawerItems() {
        BoothClient boothClient = ServiceGenerator.createService(BoothClient.class);
        Call<List<Booth>> call = boothClient.getBooths(null);

        call.enqueue(new Callback<List<Booth>>() {
            @Override
            public void onResponse(Call<List<Booth>> call, Response<List<Booth>> response) {

                List<Booth> booths = response.body();
                for (Booth booth : booths) {
                    System.out.println(booth.getKey());
                    eventlist.add(booth.getKey());
                }
                adapter = new ArrayAdapter<String>(BoothListActivity.this, android.R.layout.simple_list_item_1, eventlist);
                listView.setAdapter(adapter);

                listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                    @Override
                    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                        System.out.println(position);
                    }
                });
            }

            @Override public void onFailure(Call<List<Booth>> call, Throwable t) {
                Toast.makeText(BoothListActivity.this,"Error :(",Toast.LENGTH_SHORT).show();
            }
        });
    }

}

