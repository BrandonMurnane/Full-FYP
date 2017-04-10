package com.Salesforce.SalesforceSProximityConL3J;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Toast;

import com.Salesforce.SalesforceSProximityConL3J.Clients.EventClient;
import com.Salesforce.SalesforceSProximityConL3J.Models.Event;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class EventListActivity extends BaseActivity {

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
        EventClient eventClient = ServiceGenerator.createService(EventClient.class);
        Call<List<Event>> call = eventClient.getEvents(null);

        call.enqueue(new Callback<List<Event>>() {
            @Override
            public void onResponse(Call<List<Event>> call, Response<List<Event>> response) {

                List<Event> events = response.body();
                for (Event event : events) {
                    System.out.println(event.getKey());
                    eventlist.add(event.getKey());
                }
                adapter = new ArrayAdapter<String>(EventListActivity.this, android.R.layout.simple_list_item_1, eventlist);
                listView.setAdapter(adapter);

                listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                    @Override
                    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                        System.out.println(position);
                    }
                });
            }

            @Override
            public void onFailure(Call<List<Event>> call, Throwable t) {
                Toast.makeText(EventListActivity.this,"Error :(",Toast.LENGTH_SHORT).show();
            }
        });
    }

}
