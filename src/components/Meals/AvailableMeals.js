import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItems from "./MealItems/MealItems";
import { useEffect, useState } from "react";

// useEffect expects a synchronous cleanup function and therefore does not accept async await. To add it in useEffect either way, creater a new function within useEffect.
function AvailableMeals() {
  const [meals , setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://food-app-8476f-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      const leadedMeals = [];

      for (const key in data) {
        leadedMeals.push({
          id: key,
          image: data[key].image,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
        })
      }
      setMeals(leadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch(error => {
      setIsLoading(false);
      setError(error.message)
    })
  }, []);

  if (isLoading) {
    return (
      <section className={classes.loading}><p style={{color: 'black'}}>Loading list of meals..</p></section>
    )
  }

  if (error) {
    return (
      <secton className={classes.mealsError}><p>{error}</p></secton>
    )
  }

  const mealsList = meals.map((meal) => (
    <MealItems
      key={meal.id}
      id={meal.id}
      image={meal.image}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;
