package com.umami.backend.umamiBackend.config;


import com.umami.backend.umamiBackend.models.Meal;
import com.umami.backend.umamiBackend.repo.MealRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final MealRepo mealRepository;

    public DataInitializer(MealRepo mealRepository) {
        this.mealRepository = mealRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Prevent duplicate insertion if the H2 database is persistent across hot-swaps
        if (mealRepository.count() == 0) {
            mealRepository.saveAll(List.of(
                    // === INDIAN DISHES ===
                    new Meal("m1", "Butter Chicken", "14.99", "Tender succulent chicken pieces grilled in a tandoor, then simmered in a rich, creamy, and mildly spiced tomato-butter gravy.", "images/butter-chicken.jpg"),
                    new Meal("m2", "Paneer Tikka Masala", "13.49", "Marinated cubes of cottage cheese grilled to perfection and tossed in a thick, vibrant, deeply aromatic onion-tomato masala spiced curry.", "images/paneer-tikka.jpg"),
                    new Meal("m3", "Chole Bhature", "10.99", "A classic Punjabi pairing of spiced, tangy chickpea curry served with two large, fluffy, deep-fried golden leavened breads.", "images/chole-bhature.jpg"),
                    new Meal("m4", "Hyderabadi Biryani", "15.99", "Fragrant, long-grain basmati rice layered with spiced marinated vegetables, slow-cooked on 'dum' with saffron, fresh mint, and fried onions.", "images/hyderabadi-biryani.jpg"),
                    new Meal("m5", "Masala Dosa", "9.49", "A thin, crispy fermented rice and lentil crepe stuffed with a savory, lightly spiced potato-onion mash, served with coconut chutney and hot sambar.", "images/masala-dosa.jpg"),
                    new Meal("m6", "Samosa Chaat", "7.99", "Crushed crisp potato samosas smothered in spiced chickpea curry, drizzled with sweet yogurt, tangy tamarind chutney, and fiery mint sauce.", "images/samosa-chaat.jpg"),

                    // === JAPANESE DISHES ===
                    new Meal("m7", "Tonkotsu Ramen", "14.49", "A deep, rich 16-hour pork bone broth served with springy wheat noodles, tender chashu slices, a soft-boiled marinated egg, and nori.", "images/tonkotsu-ramen.jpg"),
                    new Meal("m8", "Salmon Nigiri Platter", "16.99", "Premium slices of fresh, melt-in-your-mouth Atlantic salmon gently pressed over seasoned, tangy vinegared sushi rice.", "images/salmon-nigiri.jpg"),
                    new Meal("m9", "Chicken Katsu Curry", "13.99", "A crispy, panko-breaded fried chicken cutlet sliced and served over hot steamed rice, smothered in a thick, rich, savory Japanese curry sauce.", "images/chicken-katsu.jpg"),
                    new Meal("m10", "Shrimp Tempura Grid", "12.99", "Plump, juicy king prawns coated in an ultra-light, lacey, golden tempura batter, deep-fried to a delicate crunch and served with tentsuyu dipping sauce.", "images/shrimp-tempura.jpg"),


                    // === AMERICAN DISHES ===
                    new Meal("m11", "Classic Cheeseburger", "11.49", "A juicy, smash-seared chicken patty topped with melted sharp cheddar cheese, pickles, crisp lettuce, tomato, and special burger sauce on a toasted brioche bun.", "images/cheeseburger.jpg"),
                    new Meal("m12", "BBQ Smoked Ribs", "18.99", "A half-slab of tender, fall-off-the-bone pork ribs slow-smoked over hickory wood and slathered in a sticky, sweet, and smoky signature barbecue sauce.", "images/bbq-ribs.jpg"),
                    new Meal("m13", "Mac & Cheese", "8.99", "Creamy cheddar cheese mixed with perfectly cooked macaroni, topped with crispy breadcrumbs. A classic comfort food.", "images/mac-and-cheese.jpg"),
                    new Meal("m14", "Buffalo Chicken Wings", "10.49", "Eight jumbo, crispy fried chicken wings tossed in a fiery, tangy cayenne pepper sauce, served with celery sticks and blue cheese dipping sauce.", "images/chicken-wings.jpg"),
                    new Meal("m15", "New York Strip Steak", "22.99", "A premium, thick-cut strip steak seared in a cast-iron skillet with garlic, fresh rosemary, and foaming butter, served with mashed potatoes.", "images/strip-steak.jpg"),
                    new Meal("m16", "Philly Cheesesteak Sandwich", "12.99", "Thinly shaved ribeye steak griddled with caramelized onions and green peppers, smothered in melted provolone cheese inside a toasted hoagie roll.", "images/philly-cheesesteak.jpg"),

                    // === DESSERTS / FUSION EXTRA ===
                    new Meal("m17", "Matcha Cheesecake", "6.99", "A velvety, rich cheesecake infused with premium Japanese green tea matcha powder, set on a buttery, crushed graham cracker crust.", "images/matcha-cheesecake.jpg"),
                    new Meal("m18", "Gulab Jamun with Cream", "5.99", "Two soft, golden-fried milk-solid dumplings soaked in a warm cardamom and rosewater syrup, served alongside vanilla bean ice cream.", "images/gulab-jamun.jpg")
            ));
            System.out.println(">> Database successfully seeded with 18 premium global fusion meals!");
        }
    }
}
