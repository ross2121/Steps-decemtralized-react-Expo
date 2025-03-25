package com.youval21.StepsDecentralized

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object RetrofitClient {
    private const val BASE_URL = "https://v0-express-api-deployment.vercel.app/api/"
    val instance: BackendApiService by lazy {
        Retrofit.Builder()
            .baseUrl("https://decentrailzed-ttrack-3yr8.vercel.app/api/v1/regular/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(BackendApiService::class.java)
    }
}