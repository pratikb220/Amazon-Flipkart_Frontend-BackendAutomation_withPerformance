import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.json.JSONObject;

import java.io.FileWriter;

import static io.restassured.RestAssured.given;

public class AmazonSearchAPI {
    public static void main(String[] args) {
        String apiURL = "https://realtime.oxylabs.io/v1/queries";

        JSONObject requestBody = new JSONObject();
        requestBody.put("source", "amazon_search");
        requestBody.put("query", "Apple iPhone 15 Plus (Black, 128 GB)");
        requestBody.put("domain", "in");
        requestBody.put("geo_location", "110001");
        requestBody.put("parse", true);

        String userName = "pratiik_DkHJ4";
        String password = "Rockstone123=";

        Response response = RestAssured.given()
                .auth()
                .preemptive()
                .basic(userName, password)
                .header("Content-Type", "application/json")
                .body(requestBody.toString())
                .post(apiURL);

        if(response.statusCode() == 200){
            //System.out.println("Amazon Search Result: " + response.prettyPrint());
            int firstProductPriceBackend = response.jsonPath().getInt("results[0].content.results.organic[0].price");
            String firstProductTitle = response.jsonPath().getString("results[0].content.results.organic[0].title");
            System.out.println(firstProductTitle + ": " + firstProductPriceBackend);
            //savePriceToFile(firstProductPriceBackend, "amazon_BackendPrice.txt");

        }
        else{
            System.out.println("Failed to fetch results. Status code: " + response.statusCode());
        }
    }
//    public static void savePriceToFile(int price, String fileName){
//        try(FileWriter fileWriter = new FileWriter(fileName)){
//            fileWriter.write(String.valueOf(price));
//        }
//        catch(Exception e){
//            e.printStackTrace();
//        }
//    }
}
