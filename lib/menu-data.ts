export interface MenuItem {
  name: string;
  price: string;
  desc: string;
  cat: 'pizza' | 'apps' | 'salads' | 'mains' | 'basket' | 'drinks';
}

export const foodItems: MenuItem[] = [
  // Appetizers
  { name: 'Chicken Wings', price: '$12.99', desc: 'A dozen wings your way.', cat: 'apps' },
  { name: 'Boneless Chicken', price: '$10.99', desc: 'Tossed in strike sauce.', cat: 'apps' },
  { name: 'Jalapeno Poppers', price: '$8.99', desc: 'Cream cheese–stuffed jalapeños, fried golden.', cat: 'apps' },
  { name: 'Mozzarella Sticks', price: '$9.99', desc: 'Six golden sticks with marinara.', cat: 'apps' },
  { name: 'Corn Dog Nuggets', price: '$5.99', desc: 'Mini corn dogs, great for sharing.', cat: 'apps' },
  { name: 'Corn Nuggets', price: '$5.99', desc: 'Sweet corn fritters, crispy outside.', cat: 'apps' },
  { name: 'Fried Okra', price: '$4.59', desc: 'Southern-style battered okra.', cat: 'apps' },
  { name: 'Fries', price: '$3.99', desc: 'Classic golden fries.', cat: 'apps' },
  { name: 'Tots', price: '$3.99', desc: 'Crispy tater tots.', cat: 'apps' },
  { name: 'Hot Dog', price: '$3.99', desc: 'All-beef hot dog on a toasted bun.', cat: 'apps' },
  { name: 'Grilled Cheese', price: '$4.00', desc: 'Melted cheese on grilled bread.', cat: 'apps' },
  { name: 'BLT', price: '$5.99', desc: 'Bacon, lettuce, tomato on toasted bread.', cat: 'apps' },
  { name: 'Baked Beans', price: '$2.99', desc: 'Slow-cooked seasoned beans.', cat: 'apps' },
  { name: 'Coleslaw', price: '$2.99', desc: 'House-made creamy coleslaw.', cat: 'apps' },
  { name: 'Mix Veggie', price: '$3.99', desc: 'Seasonal mixed vegetables.', cat: 'apps' },
  { name: '3 Pieces Chicken', price: '$4.99', desc: 'Three pieces of fried chicken.', cat: 'apps' },
  { name: 'Jalapenos', price: '$0.99', desc: 'Fresh sliced jalapeños.', cat: 'apps' },
  { name: 'Chips', price: '$1.59', desc: 'Bag of chips.', cat: 'apps' },
  { name: 'Cheese Cup', price: '$2.00', desc: 'Warm cheese dipping cup.', cat: 'apps' },

  // Salads
  { name: 'House Salad', price: '$4.59', desc: 'Fresh garden salad with your choice of dressing.', cat: 'salads' },
  { name: 'Chef Salad', price: '$8.99', desc: 'Ham, turkey, cheese, egg, and fresh veggies.', cat: 'salads' },
  { name: 'Grilled Chicken Salad', price: '$10.99', desc: 'Grilled chicken breast over fresh greens.', cat: 'salads' },

  // Entrees
  { name: 'Shrimp Dinner', price: '$12.99', desc: '6 pieces of shrimp served as a dinner plate.', cat: 'mains' },
  { name: 'Fish', price: '$13.99–$18.99', desc: 'Fried fish — price varies by size.', cat: 'mains' },
  { name: 'Chicken Tenders', price: '$10.99', desc: 'Hand-breaded chicken tenders.', cat: 'mains' },
  { name: 'Combo Platter', price: '$32.99', desc: '6 chicken strips, 6 fish, and 3 sides.', cat: 'mains' },
  { name: 'Molten Lava Cake', price: '$5.99', desc: 'Warm chocolate lava cake.', cat: 'mains' },

  // Basket (Burgers, Sandwiches, Wraps)
  { name: 'Millennium Burger', price: '$9.99', desc: 'Our signature burger, made fresh.', cat: 'basket' },
  { name: 'Hawg Double Cheeseburger', price: '$12.99', desc: 'Double patty cheeseburger loaded up.', cat: 'basket' },
  { name: 'Happy Club', price: '$9.99', desc: 'Club sandwich stacked with the works.', cat: 'basket' },
  { name: 'Grilled Chicken Sandwich', price: '$11.99', desc: 'Grilled chicken breast on a toasted bun.', cat: 'basket' },
  { name: 'Grilled Chicken Wrap', price: '$7.99', desc: 'Grilled chicken with fresh toppings in a wrap.', cat: 'basket' },
  { name: "Happy's Wrap", price: '$9.99', desc: 'A fan-favorite wrap, loaded and fresh.', cat: 'basket' },
  { name: 'Philly Swiss', price: '$11.99', desc: 'Philly-style steak with Swiss cheese.', cat: 'basket' },
  { name: 'Chicken Philly', price: '$11.99', desc: 'Philly-style grilled chicken sandwich.', cat: 'basket' },
  { name: 'Ham & Cheese', price: '$7.99', desc: 'Classic ham and cheese sandwich.', cat: 'basket' },

  // Pizzas
  { name: 'Pepperoni Pizza', price: '$17.99', desc: 'Classic pepperoni on our house pizza.', cat: 'pizza' },
  { name: 'Sausage Pizza', price: '$17.99', desc: 'Italian sausage on our house pizza.', cat: 'pizza' },
  { name: 'Meat Lovers Pizza', price: '$21.99', desc: 'Loaded with pepperoni, sausage, and more.', cat: 'pizza' },
  { name: 'Supreme Pizza 16"', price: '$22.99', desc: 'Everything on it — the full works.', cat: 'pizza' },
  { name: 'Veggie Pizza', price: '$14.99', desc: 'Fresh vegetables on our house pizza.', cat: 'pizza' },
  { name: 'Cheese Pizza', price: '$14.99', desc: 'Classic cheese pizza, simple and good.', cat: 'pizza' },
  { name: 'Slice Cheese Pizza', price: '$4.99', desc: 'Single slice of cheese pizza.', cat: 'pizza' },
];

export const drinkItems: MenuItem[] = [
  { name: 'Drink', price: '$2.99–$3.99', desc: 'Fountain drinks, size varies.', cat: 'drinks' },
  { name: 'Sweet Tea', price: '$2.99', desc: 'Southern sweet tea.', cat: 'drinks' },
  { name: 'Unsweet Tea', price: '$2.99', desc: 'Unsweetened iced tea.', cat: 'drinks' },
  { name: 'Slush', price: '$3.59–$4.59', desc: 'Icy slush drink, size varies.', cat: 'drinks' },
  { name: 'Dippin Dots', price: '$3.99', desc: 'Flash-frozen ice cream beads.', cat: 'drinks' },
  { name: 'Red Bull', price: '$3.99', desc: 'Red Bull energy drink.', cat: 'drinks' },
  { name: 'Bottle Drink', price: '$2.99', desc: 'Bottled beverage.', cat: 'drinks' },
  { name: 'Bottle Water', price: '$1.59', desc: 'Cold bottled water.', cat: 'drinks' },
  { name: 'Water', price: '$0.89', desc: 'Water.', cat: 'drinks' },
  { name: 'Coffee', price: '$1.99', desc: 'Hot coffee.', cat: 'drinks' },
  { name: 'Hot Cocoa', price: '$2.99', desc: 'Warm hot chocolate.', cat: 'drinks' },
  { name: 'Refill', price: '$1.00', desc: 'Drink refill.', cat: 'drinks' },
  { name: 'BeatBox', price: '$6.00', desc: 'BeatBox party punch.', cat: 'drinks' },
];

export const allMenuItems: MenuItem[] = [...foodItems, ...drinkItems];
