import { characterData } from "../data/character";

export function initCharacter() {
  if (!localStorage.getItem("character")) {
    localStorage.setItem("character", JSON.stringify(characterData));
  }
}
