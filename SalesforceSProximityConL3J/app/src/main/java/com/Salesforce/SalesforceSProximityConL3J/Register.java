package com.Salesforce.SalesforceSProximityConL3J;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Toast;

import com.Salesforce.SalesforceSProximityConL3J.Clients.CategoryClient;
import com.Salesforce.SalesforceSProximityConL3J.Clients.EventClient;
import com.Salesforce.SalesforceSProximityConL3J.Clients.UserClient;
import com.Salesforce.SalesforceSProximityConL3J.Models.Category;
import com.Salesforce.SalesforceSProximityConL3J.Models.Event;
import com.Salesforce.SalesforceSProximityConL3J.Models.User;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class Register extends AppCompatActivity {

    private EditText muserGroupView;
    private EditText mPasswordView;
    private EditText memailView;
    private EditText muserNameView;
    private EditText mname;

    private ArrayList<String> categorylist = new ArrayList<String>();




    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        mPasswordView = (EditText) findViewById(R.id.password);
        muserGroupView = (EditText) findViewById(R.id.userGroup);
        memailView = (EditText) findViewById(R.id.email);
        muserNameView = (EditText) findViewById(R.id.userName);
        mname = (EditText) findViewById(R.id.name);




        CategoryClient categoryClient = ServiceGenerator.createService(CategoryClient.class);
        Call<List<Category>> call = categoryClient.getCategories();

        call.enqueue(new Callback<List<Category>>() {
            @Override
            public void onResponse(Call<List<Category>> call, Response<List<Category>> response) {

                List<Category> categories = response.body();
                int i = 0;
                CheckBox[] checkBox = new CheckBox[categories.size()];

                for (Category category : categories) {
                    System.out.println(category.getKey());
                    LinearLayout checkBoxGroup = (LinearLayout) findViewById(R.id.categories);
                    checkBox[i] = new CheckBox(Register.this);
                    checkBoxGroup.addView(checkBox[i]);
                    checkBox[i].setId(i);
                    checkBox[i].setText(category.getKey());
                    checkBox[i].setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener()
                    {
                        @Override
                        public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                            categorylist.add(buttonView.getText().toString());
                        }
                    });
                    i++;
                }
            }

            @Override
            public void onFailure(Call<List<Category>> call, Throwable t) {
                Toast.makeText(Register.this,"Error :(",Toast.LENGTH_SHORT).show();
            }
        });

        Button mRegisterButton = (Button) findViewById(R.id.Send_Register);

        mRegisterButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                UserClient userClient = ServiceGenerator.createService(UserClient.class);

                String email = memailView.getText().toString();
                String userGroup = muserGroupView.getText().toString();
                String password = mPasswordView.getText().toString();
                String userName = muserNameView.getText().toString();
                String Name = mname.getText().toString();



                User user = new User(email,userName,categorylist,password, userGroup,Name);


                Call<User> call = userClient.postUser(user);

                call.enqueue(new Callback<User>() {
                    @Override
                    public void onResponse(Call<User> call, Response<User> response) {

                        Intent intent = new Intent(Register.this, LoginActivity.class);
                        startActivity(intent);

                    }

                    @Override
                    public void onFailure(Call<User> call, Throwable t) {
                        Toast.makeText(Register.this,"Error with register :(",Toast.LENGTH_SHORT).show();
                    }
                });
            }
        });

    }

}
