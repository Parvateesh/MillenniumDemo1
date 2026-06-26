export interface MenuItem {
  name: string;
  price: string;
  desc: string;
  cat: 'pizza' | 'apps' | 'mains' | 'drinks';
}

export const foodItems: MenuItem[] = [
  { name: 'The Strike', price: '$16', desc: 'Pepperoni, Italian sausage, fresh mozzarella, San Marzano tomato. The classic.', cat: 'pizza' },
  { name: 'Spare Me', price: '$18', desc: 'Margherita: hand-stretched, fresh basil, EVOO, sea salt. Vegetarian.', cat: 'pizza' },
  { name: '300 Pie', price: '$22', desc: 'Loaded: pepperoni, sausage, peppers, mushrooms, olives, red onion. Bring friends.', cat: 'pizza' },
  { name: 'Loaded Tots', price: '$11', desc: 'Cheddar, bacon, scallions, sour cream, hot sauce on the side.', cat: 'apps' },
  { name: 'Wings', price: '$13', desc: '10 jumbo wings: buffalo, BBQ, garlic parm, lemon pepper, or naked. Ranch or blue.', cat: 'apps' },
  { name: 'Pretzel Sticks', price: '$9', desc: 'Soft pretzels, beer cheese, spicy mustard.', cat: 'apps' },
  { name: 'Mozz Sticks', price: '$8', desc: 'Six golden sticks, marinara. Crowd favorite.', cat: 'apps' },
  { name: 'Bowler Burger', price: '$13', desc: '8 oz Angus, American, lettuce, tomato, onion, pickle, brioche. Add bacon $2.', cat: 'mains' },
  { name: 'Chicken Tenders', price: '$11', desc: 'Hand-breaded, served with fries. Honey mustard, ranch, or BBQ.', cat: 'mains' },
  { name: 'Nachos Supreme', price: '$12', desc: 'House chips, queso, ground beef, jalapeños, salsa, sour cream.', cat: 'mains' },
];

export const drinkItems: MenuItem[] = [
  { name: 'Draft Beer', price: '$5–7', desc: 'Eight on tap. Local rotating: Lost Forty, Stone\'s Throw, Diamond Bear, plus the usual suspects.', cat: 'drinks' },
  { name: 'Frozen Margarita', price: '$9', desc: 'Lime, strawberry, or swirl. Pitchers $24.', cat: 'drinks' },
  { name: 'Strike Zone Old Fashioned', price: '$11', desc: 'Bourbon, demerara, orange peel, cherry. House signature.', cat: 'drinks' },
  { name: 'Soft Drinks', price: '$3', desc: 'Coke products, lemonade, sweet tea, free refills. Iced coffee available.', cat: 'drinks' },
];

export const allMenuItems: MenuItem[] = [...foodItems, ...drinkItems];
