package com.youval21.StepsDecentralized
import retrofit2.http.Body
import retrofit2.http.POST

interface BackendApiService {
    @POST(".")
     fun sendSteps(@Body request: StepsRequest): StepsResponse
}
data class StepsResponse(
    val success: Boolean,
    val message: String
)
data class StepsRequest(
    val steps: Int
)