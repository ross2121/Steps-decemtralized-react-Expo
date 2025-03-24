package com.youval21.StepsDecentralized
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST
import retrofit2.http.GET
interface BackendApiService {
    @POST("/test/step")
     fun sendSteps(@Body request: StepsRequest):Response<StepsResponse>
    @GET("/total/steps")
    fun getstep():Response<steps>
     
}
data class StepsResponse(
    val success: Boolean,
    val message: String
)
data class steps(
    val data:String
)
data class StepsRequest(
    val step: Int
)