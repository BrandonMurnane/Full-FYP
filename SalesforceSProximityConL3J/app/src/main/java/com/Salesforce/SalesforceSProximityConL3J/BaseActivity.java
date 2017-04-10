package com.Salesforce.SalesforceSProximityConL3J;

import android.app.Activity;
import android.content.Intent;
import android.content.res.Configuration;
import android.os.Bundle;
import android.support.annotation.LayoutRes;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;

import com.Salesforce.SalesforceSProximityConL3J.Clients.VisitClient;
import com.Salesforce.SalesforceSProximityConL3J.Models.Visit;
import com.Salesforce.SalesforceSProximityConL3J.estimote.BeaconID;
import com.Salesforce.SalesforceSProximityConL3J.estimote.EstimoteCloudBeaconDetails;
import com.Salesforce.SalesforceSProximityConL3J.estimote.EstimoteCloudBeaconDetailsFactory;
import com.Salesforce.SalesforceSProximityConL3J.estimote.ProximityContentManager;

import java.util.Arrays;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


/**
 * Created by bmurnane on 09/03/2017.
 */

public class BaseActivity extends Activity
{


    private ListView mDrawerList;
    private ArrayAdapter<String> mAdapter;
    private DrawerLayout mDrawerLayout;
    private ActionBarDrawerToggle mDrawerToggle;
    private String mActivityTitle;
    private ProximityContentManager proximityContentManager;
    private long tStart = 0;
    private String beaconName ="";

    protected void onCreateDrawer()
    {

        mActivityTitle = getTitle().toString();
        String userId = getIntent().getStringExtra("USER_ID");

        if(userId == null){
            Intent intent = new Intent(this, LoginActivity.class);
            startActivity(intent);
        }

        proximityContentManager = new ProximityContentManager(this,
                Arrays.asList(
                        new BeaconID("B9407F30-F5F8-466E-AFF9-25556B57FE6D", 50265, 52545)),
                new EstimoteCloudBeaconDetailsFactory());
        proximityContentManager.setListener(new ProximityContentManager.Listener() {
            @Override
            public void onContentChanged(Object content) {
                String text;
                Integer backgroundColor;
                if (content != null) {
                    tStart = System.currentTimeMillis();

                    EstimoteCloudBeaconDetails beaconDetails = (EstimoteCloudBeaconDetails) content;
                    beaconName = beaconDetails.getBeaconName();
                }
                if(tStart > 0 && content == null) {
                    long tEnd = System.currentTimeMillis();
                    long tDelta = tEnd - tStart;
                    tStart = 0;
                    double elapsedSeconds = tDelta / 1000.0;
                    if(elapsedSeconds > 20){
                        String[] parts = beaconName.split(":");
                        String part1 = parts[0]; // 004
                        String part2 = parts[1]; // 034556
                        Visit visit =new Visit();
                        String userId = getIntent().getStringExtra("USER_ID");
                        String userGroup = getIntent().getStringExtra("USER_GROUP");

                        VisitClient visitClient = ServiceGenerator.createService(VisitClient.class);
                        if (part1 == "booth") {
                             visit = new Visit(""+tStart, ""+ tEnd, userGroup, part2,"",userId);
                        } else {
                             visit = new Visit(""+tStart, ""+ tEnd, userGroup,"",part2,userId);
                        }

                        Call<Visit> call = visitClient.postVisit(visit);

                        call.enqueue(new Callback<Visit>() {
                            @Override
                            public void onResponse(Call<Visit> call, Response<Visit> response) {

                                Visit visit = response.body();

                            }

                            @Override
                            public void onFailure(Call<Visit> call, Throwable t) {
                                //Toast.makeText(LoginActivity.this,"Error with login :(",Toast.LENGTH_SHORT).show();
                            }
                        });

                    }
                }
            }
        });

        mDrawerList = (ListView)findViewById(R.id.navList);
        mDrawerLayout = (DrawerLayout)findViewById(R.id.drawer_layout);
        //getActionBar().setDisplayHomeAsUpEnabled(true);
        //getActionBar().setHomeButtonEnabled(true);
        addDrawerItems();
        setupDrawer();
    }

    @Override
    public void setContentView(@LayoutRes int layoutResID)
    {
        super.setContentView(layoutResID);
        onCreateDrawer();
    }


    private void addDrawerItems() {
        String[] osArray = {"HomePage", "Event List","Booth List" };
        mAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, osArray);
        mDrawerList.setAdapter(mAdapter);

        mDrawerList.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                selectItem(position);
            }
        });
    }

    public void selectItem(int position) {
        Intent intent = null;
        String userId = getIntent().getStringExtra("USER_ID");
        String userGroup = getIntent().getStringExtra("USER_GROUP");

        switch(position) {
            case 0:
                intent = new Intent(this, MainActivity.class);
                intent.putExtra("USER_ID", userId);
                intent.putExtra("USER_GROUP", userGroup);
                break;
            case 1:
                intent = new Intent(this, EventListActivity.class);
                intent.putExtra("USER_ID", userId);
                intent.putExtra("USER_GROUP", userGroup);
                break;
            case 2:
                intent = new Intent(this, BoothListActivity.class);
                intent.putExtra("USER_ID", userId);
                intent.putExtra("USER_GROUP", userGroup);
                break;

            default :
                intent = new Intent(this, EventListActivity.class); // Activity_0 as default
                intent.putExtra("USER_ID", userId);
                intent.putExtra("USER_GROUP", userGroup);
                break;
        }

        startActivity(intent);
    }

    private void setupDrawer() {
        mDrawerToggle = new ActionBarDrawerToggle(this, mDrawerLayout, R.string.drawer_open, R.string.drawer_close) {

            /** Called when a drawer has settled in a completely open state. */
            public void onDrawerOpened(View drawerView) {
                super.onDrawerOpened(drawerView);
                //getActionBar().setTitle("Navigation!");
                invalidateOptionsMenu(); // creates call to onPrepareOptionsMenu()
            }

            /** Called when a drawer has settled in a completely closed state. */
            public void onDrawerClosed(View view) {
                super.onDrawerClosed(view);
               // getActionBar().setTitle(mActivityTitle);
                invalidateOptionsMenu(); // creates call to onPrepareOptionsMenu()
            }
        };

        mDrawerToggle.setDrawerIndicatorEnabled(true);
        mDrawerLayout.setDrawerListener(mDrawerToggle);
    }

    @Override
    protected void onPostCreate(Bundle savedInstanceState) {
        super.onPostCreate(savedInstanceState);
        // Sync the toggle state after onRestoreInstanceState has occurred.
        mDrawerToggle.syncState();
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        mDrawerToggle.onConfigurationChanged(newConfig);
    }

}

