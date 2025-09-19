export type InventoryItem = {
  id: number;
  name: string;
  quantity: number;
};

export const inventoryData: InventoryItem[] = [
  { id: 1, name: "Health Potion", quantity: 5 },
  { id: 2, name: "Mana Potion", quantity: 3 },
  { id: 3, name: "Iron Sword", quantity: 1 },
  { id: 4, name: "Leather Armor", quantity: 1 },
  { id: 5, name: "Magic Scroll", quantity: 2 },
  { id: 6, name: "Fire Bomb", quantity: 2 },
  { id: 7, name: "Silver Ring", quantity: 1 },
];
