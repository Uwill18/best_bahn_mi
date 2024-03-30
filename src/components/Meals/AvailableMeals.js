import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem';


const Menu_Items =[
    {
        id: "1",
        name: "Brisket Banh Mi",
        description: "Juicy Beef Banh Mi sandwich served with custom sauce",
        price: 8.99
    },
    {
        id: "2",
        name: "Chicken Bahn Mi",
        description: "Succulent Chicken Bahn mi served with custom sauce",
        price: 8.99
    },
    {
        id: "3",
        name: "Avocado Smoothie",
        description: "refreshingly sweet and creamy avocado smoothie",
        price: 2.99
    },
    {
        id: "4",
        name: "Milk Tea Boba",
        description: "Richly sweet milk tea boba",
        price: 1.99
    }
];



const AvailableMeals =()=>{
const mealsList = Menu_Items.map((meal)=>

<MealItem
    id={meal.id}
    key={meal.id}
    name={meal.name}
    description={meal.description}
    price={meal.price}
/>);

    return(
        <section className={classes.meals}>
            <ul>{mealsList}</ul>
        </section>
    )
}

export default AvailableMeals;