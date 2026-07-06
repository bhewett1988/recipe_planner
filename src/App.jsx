import { useState, useMemo, useRef } from "react";

const STAPLES = [
  "Olive oil", "Salt", "Black pepper", "Garlic powder", "Onion powder",
  "Paprika", "Cumin", "Chilli flakes", "Dried oregano", "Dried thyme",
  "Dried basil", "Turmeric", "Coriander (ground)", "Cinnamon", "Soy sauce",
  "Fish sauce", "Worcestershire sauce", "Balsamic vinegar", "White wine vinegar"
];

const INITIAL_RECIPES = [
  {
    id: 1, name: "Harissa Chicken Thighs & Roasted Veg", tag: "High Protein",
    time: "35 min", kcal: 605, protein: 52,
    desc: "Spiced chicken thighs with roasted courgette, peppers and a yoghurt drizzle.",
    ingredients: [
      { item: "Chicken thighs (skinless, boneless)", qty: "900g", forKid: true },
      { item: "Courgette", qty: "2", forKid: true },
      { item: "Red pepper", qty: "2", forKid: true },
      { item: "Cherry tomatoes", qty: "200g", forKid: true },
      { item: "Harissa paste", qty: "3 tbsp", forKid: false },
      { item: "Greek yoghurt", qty: "150g", forKid: true },
      { item: "Lemon", qty: "1", forKid: true },
      { item: "Fresh coriander", qty: "small bunch", forKid: false },
    ],
    method: [
      "Preheat oven to 200°C. Toss chicken in harissa, season well.",
      "Chop veg, spread on a tray with olive oil, roast 15 min.",
      "Add chicken to tray, roast a further 20 min until cooked through.",
      "Mix yoghurt with lemon juice. Serve over chicken with fresh coriander."
    ],
    staples: ["Olive oil", "Salt", "Black pepper"],
    kidNotes: "Leave harissa off kid's portion; season plain with olive oil."
  },
  {
    id: 2, name: "Beef & Black Bean Stir Fry", tag: "Quick",
    time: "20 min", kcal: 595, protein: 50,
    desc: "Lean beef strips in a sticky black bean sauce with egg noodles.",
    ingredients: [
      { item: "Lean beef strips (sirloin or rump)", qty: "600g", forKid: true },
      { item: "Egg noodles", qty: "300g", forKid: true },
      { item: "Black bean sauce", qty: "4 tbsp", forKid: false },
      { item: "Tenderstem broccoli", qty: "200g", forKid: true },
      { item: "Spring onions", qty: "4", forKid: true },
      { item: "Fresh ginger", qty: "thumb-sized piece", forKid: false },
      { item: "Sesame oil", qty: "1 tbsp", forKid: true },
      { item: "Cornflour", qty: "1 tbsp", forKid: true },
    ],
    method: [
      "Cook noodles per pack. Slice beef thinly, dust with cornflour.",
      "Grate ginger. Heat wok until smoking, add sesame oil.",
      "Sear beef 2 min, remove. Stir fry broccoli and spring onion 3 min.",
      "Return beef, add black bean sauce and a splash of water. Toss with noodles."
    ],
    staples: ["Soy sauce", "Fish sauce", "Black pepper", "Olive oil"],
    kidNotes: "Serve kid's portion before adding black bean sauce; plain beef strips with noodles."
  },
  {
    id: 3, name: "Salmon Teriyaki with Sticky Rice", tag: "Omega-3",
    time: "30 min", kcal: 610, protein: 51,
    desc: "Glazed salmon fillets with edamame, sesame cucumber and steamed rice.",
    ingredients: [
      { item: "Salmon fillets", qty: "4 × 150g", forKid: true },
      { item: "Jasmine rice", qty: "300g (dry)", forKid: true },
      { item: "Edamame (frozen)", qty: "150g", forKid: true },
      { item: "Cucumber", qty: "½", forKid: true },
      { item: "Honey", qty: "2 tbsp", forKid: true },
      { item: "Mirin", qty: "2 tbsp", forKid: false },
      { item: "Sesame seeds", qty: "1 tbsp", forKid: true },
    ],
    method: [
      "Cook rice. Mix honey, soy sauce and mirin for glaze.",
      "Score salmon skin, brush with glaze. Pan-fry skin-down 4 min.",
      "Flip, brush again, cook 3 more min.",
      "Slice cucumber, toss with rice vinegar and sesame seeds. Serve with edamame."
    ],
    staples: ["Soy sauce", "Salt", "Olive oil"],
    kidNotes: "Use plain honey glaze only on kid's fillet. No mirin."
  },
  {
    id: 4, name: "Turkey Meatball Marinara with Penne", tag: "Family Favourite",
    time: "40 min", kcal: 590, protein: 53,
    desc: "Herby turkey meatballs in a rich tomato sauce with wholewheat penne.",
    ingredients: [
      { item: "Turkey mince", qty: "700g", forKid: true },
      { item: "Wholewheat penne", qty: "350g", forKid: true },
      { item: "Chopped tomatoes (tin)", qty: "2 × 400g", forKid: true },
      { item: "Tomato purée", qty: "2 tbsp", forKid: true },
      { item: "Egg", qty: "1", forKid: true },
      { item: "Parmesan", qty: "50g", forKid: true },
      { item: "Breadcrumbs", qty: "40g", forKid: true },
      { item: "Onion", qty: "1", forKid: true },
      { item: "Garlic cloves", qty: "3", forKid: true },
    ],
    method: [
      "Mix turkey with egg, breadcrumbs, half the parmesan, dried basil, salt and pepper. Roll into 20 balls.",
      "Brown meatballs in batches in olive oil, set aside.",
      "Soften diced onion and garlic, add tomatoes and purée. Simmer 10 min.",
      "Return meatballs to sauce, simmer 15 min. Serve over penne with parmesan."
    ],
    staples: ["Olive oil", "Dried basil", "Dried oregano", "Salt", "Black pepper", "Garlic powder"],
    kidNotes: "Great as-is for kids. Serve meatballs whole or halved."
  },
  {
    id: 5, name: "Prawn & Chorizo Paella", tag: "Weekend Vibes",
    time: "45 min", kcal: 615, protein: 50,
    desc: "One-pan smoky paella with king prawns, chorizo and saffron rice.",
    ingredients: [
      { item: "Raw king prawns (peeled)", qty: "400g", forKid: true },
      { item: "Cooking chorizo", qty: "150g", forKid: true },
      { item: "Paella rice", qty: "300g", forKid: true },
      { item: "Chicken stock (cube)", qty: "1L", forKid: true },
      { item: "Frozen peas", qty: "150g", forKid: true },
      { item: "Red pepper", qty: "1", forKid: true },
      { item: "Onion", qty: "1", forKid: true },
      { item: "Garlic cloves", qty: "3", forKid: true },
      { item: "Saffron", qty: "pinch", forKid: true },
      { item: "Lemon", qty: "1", forKid: true },
    ],
    method: [
      "Sauté onion, garlic and pepper until soft. Add sliced chorizo, cook 3 min.",
      "Add rice, stir to coat in oils. Add saffron-infused stock.",
      "Simmer uncovered 20 min without stirring. Add prawns and peas last 5 min.",
      "Leave to rest 5 min before serving with lemon wedges."
    ],
    staples: ["Olive oil", "Salt", "Black pepper", "Paprika", "Turmeric"],
    kidNotes: "Kid gets same dish — mild and flavourful. Ensure prawns are fully cooked."
  },
  {
    id: 6, name: "Chicken & Chickpea Coconut Curry", tag: "Comfort",
    time: "35 min", kcal: 598, protein: 51,
    desc: "Warming coconut milk curry with spinach, served over basmati rice.",
    ingredients: [
      { item: "Chicken breast", qty: "700g", forKid: true },
      { item: "Chickpeas (tin)", qty: "400g", forKid: true },
      { item: "Coconut milk (tin)", qty: "400ml", forKid: true },
      { item: "Baby spinach", qty: "100g", forKid: true },
      { item: "Onion", qty: "1", forKid: true },
      { item: "Garlic cloves", qty: "3", forKid: true },
      { item: "Fresh ginger", qty: "thumb", forKid: true },
      { item: "Tomato purée", qty: "2 tbsp", forKid: true },
      { item: "Mild curry powder", qty: "2 tbsp", forKid: true },
      { item: "Basmati rice", qty: "300g (dry)", forKid: true },
    ],
    method: [
      "Dice chicken, brown in batches. Set aside.",
      "Soften onion, garlic, ginger. Add curry powder, cook 1 min.",
      "Add tomato purée, chickpeas, coconut milk. Simmer 15 min.",
      "Return chicken, add spinach, cook until wilted. Serve with basmati."
    ],
    staples: ["Olive oil", "Salt", "Black pepper", "Cumin", "Turmeric", "Coriander (ground)"],
    kidNotes: "Mild curry powder makes this kid-friendly. Serve with plain rice."
  },
  {
    id: 7, name: "Pork Tenderloin with Sweet Potato Mash", tag: "Lean",
    time: "40 min", kcal: 600, protein: 52,
    desc: "Herbed pork tenderloin, roasted green beans and creamy sweet potato mash.",
    ingredients: [
      { item: "Pork tenderloin", qty: "700g", forKid: true },
      { item: "Sweet potatoes", qty: "800g", forKid: true },
      { item: "Green beans", qty: "200g", forKid: true },
      { item: "Dijon mustard", qty: "2 tbsp", forKid: false },
      { item: "Honey", qty: "1 tbsp", forKid: true },
      { item: "Butter", qty: "20g", forKid: true },
      { item: "Milk (semi-skimmed)", qty: "50ml", forKid: true },
      { item: "Lemon", qty: "1", forKid: true },
    ],
    method: [
      "Preheat oven to 200°C. Peel and cube sweet potatoes, boil until tender.",
      "Mix mustard, honey, salt and pepper. Coat pork. Sear all sides in oven-safe pan.",
      "Transfer to oven for 18–20 min. Rest 5 min before slicing.",
      "Mash sweet potato with butter and milk. Roast green beans alongside pork."
    ],
    staples: ["Olive oil", "Salt", "Black pepper", "Dried thyme", "Dried rosemary"],
    kidNotes: "Serve plain pork from centre of loin (less crust). Sweet potato mash is naturally sweet and a hit."
  },
  {
    id: 8, name: "Greek Lamb Koftas with Flatbread", tag: "Bold Flavour",
    time: "30 min", kcal: 610, protein: 51,
    desc: "Spiced lamb koftas with tzatziki, flatbread, and a simple tomato salad.",
    ingredients: [
      { item: "Lamb mince", qty: "600g", forKid: true },
      { item: "Flatbreads", qty: "4", forKid: true },
      { item: "Greek yoghurt", qty: "200g", forKid: true },
      { item: "Cucumber", qty: "½", forKid: true },
      { item: "Tomatoes", qty: "3", forKid: true },
      { item: "Red onion", qty: "½", forKid: true },
      { item: "Fresh mint", qty: "small bunch", forKid: true },
      { item: "Lemon", qty: "1", forKid: true },
      { item: "Garlic cloves", qty: "2", forKid: false },
    ],
    method: [
      "Mix lamb with cumin, coriander, chilli flakes, garlic and salt. Shape into 12 koftas.",
      "Grill or pan-fry koftas 8–10 min, turning.",
      "Make tzatziki: grate cucumber, squeeze dry, mix with yoghurt, lemon, mint.",
      "Warm flatbreads. Serve koftas with tzatziki, tomato salad."
    ],
    staples: ["Cumin", "Coriander (ground)", "Chilli flakes", "Salt", "Black pepper", "Olive oil"],
    kidNotes: "Kid gets plain lamb kofta, yoghurt dip and flatbread — naturally appealing."
  },
  {
    id: 9, name: "Tuna Niçoise Power Bowl", tag: "Light",
    time: "25 min", kcal: 590, protein: 52,
    desc: "Seared tuna steak over French beans, boiled egg, olives and new potatoes.",
    ingredients: [
      { item: "Tuna steaks", qty: "4 × 130g", forKid: true },
      { item: "New potatoes", qty: "500g", forKid: true },
      { item: "Eggs", qty: "4", forKid: true },
      { item: "Fine green beans", qty: "200g", forKid: true },
      { item: "Cherry tomatoes", qty: "200g", forKid: true },
      { item: "Kalamata olives", qty: "80g", forKid: false },
      { item: "Dijon mustard", qty: "1 tsp", forKid: false },
      { item: "Lemon", qty: "1", forKid: true },
    ],
    method: [
      "Boil potatoes 15 min, boil eggs 7 min (soft centre), blanch green beans 3 min.",
      "Make dressing: lemon juice, olive oil, Dijon, salt and pepper.",
      "Sear tuna steaks 1–2 min each side (rare centre). Rest, then slice.",
      "Arrange everything in bowls, drizzle dressing over. Top with olives."
    ],
    staples: ["Olive oil", "Salt", "Black pepper", "Balsamic vinegar"],
    kidNotes: "Kid gets tuna, potato, egg and beans — no olives or dressing."
  },
  {
    id: 10, name: "Black Bean & Sweet Potato Tacos", tag: "Plant Power",
    time: "30 min", kcal: 595, protein: 50,
    desc: "Roasted sweet potato and black bean tacos with avocado, lime crema and slaw.",
    ingredients: [
      { item: "Sweet potatoes", qty: "600g", forKid: true },
      { item: "Black beans (tin)", qty: "2 × 400g", forKid: true },
      { item: "Corn tortillas (small)", qty: "12", forKid: true },
      { item: "Avocado", qty: "2", forKid: true },
      { item: "Red cabbage", qty: "¼ head", forKid: true },
      { item: "Sour cream", qty: "150ml", forKid: true },
      { item: "Lime", qty: "2", forKid: true },
      { item: "Feta cheese", qty: "100g", forKid: true },
      { item: "Smoked paprika", qty: "2 tsp", forKid: true },
    ],
    method: [
      "Cube sweet potato, toss with smoked paprika and olive oil, roast 25 min at 200°C.",
      "Drain and warm black beans with cumin and chilli flakes.",
      "Shred red cabbage finely for slaw, dress with lime juice.",
      "Warm tortillas. Build tacos: potato, beans, avocado, crema, feta, slaw."
    ],
    staples: ["Olive oil", "Cumin", "Chilli flakes", "Salt", "Black pepper"],
    kidNotes: "Kid gets soft tortilla, sweet potato and beans — simple and familiar."
  },
  {
    id: 11, name: "Lemon & Herb Baked Cod", tag: "Light",
    time: "25 min", kcal: 580, protein: 54,
    desc: "Herb-crusted cod fillets with roasted asparagus and herby butter new potatoes.",
    ingredients: [
      { item: "Cod fillets", qty: "4 × 180g", forKid: true },
      { item: "New potatoes", qty: "500g", forKid: true },
      { item: "Asparagus", qty: "300g", forKid: true },
      { item: "Parsley (fresh)", qty: "bunch", forKid: true },
      { item: "Lemon", qty: "2", forKid: true },
      { item: "Butter", qty: "30g", forKid: true },
      { item: "Capers", qty: "2 tbsp", forKid: false },
    ],
    method: [
      "Boil new potatoes 15 min. Drain and toss with butter and fresh parsley.",
      "Top cod with lemon zest, chopped parsley, salt, pepper and a drizzle of olive oil.",
      "Bake cod at 190°C for 15–18 min. Roast asparagus alongside for 12 min.",
      "Serve with lemon wedges and capers on the side."
    ],
    staples: ["Olive oil", "Salt", "Black pepper", "Dried thyme"],
    kidNotes: "Kid gets plain baked cod fillet, potatoes and asparagus. Naturally mild."
  },
  {
    id: 12, name: "Chicken Caesar Wraps", tag: "Quick",
    time: "20 min", kcal: 588, protein: 51,
    desc: "Griddled chicken in a Caesar-style wrap with romaine, parmesan and croutons.",
    ingredients: [
      { item: "Chicken breasts", qty: "600g", forKid: true },
      { item: "Large tortilla wraps", qty: "4", forKid: true },
      { item: "Romaine lettuce", qty: "1 head", forKid: true },
      { item: "Parmesan", qty: "60g", forKid: true },
      { item: "Caesar dressing", qty: "6 tbsp", forKid: true },
      { item: "Bread (for croutons)", qty: "2 slices", forKid: false },
      { item: "Lemon", qty: "1", forKid: true },
    ],
    method: [
      "Slice chicken, season and griddle 4–5 min each side until cooked.",
      "Cube bread and pan-fry in olive oil until golden croutons.",
      "Chop romaine. Mix with Caesar dressing and grated parmesan.",
      "Build wraps: chicken, salad, croutons, extra parmesan. Squeeze lemon over."
    ],
    staples: ["Olive oil", "Salt", "Black pepper", "Garlic powder"],
    kidNotes: "Kid wrap: chicken, lettuce, parmesan, mild dressing on the side."
  },
  {
    id: 13, name: "Sticky Ginger Beef Bowls", tag: "Quick",
    time: "25 min", kcal: 598, protein: 50,
    desc: "Caramelised ground beef in a ginger-hoisin sauce over jasmine rice with pickled cucumber.",
    ingredients: [
      { item: "Beef mince (lean)", qty: "600g", forKid: true },
      { item: "Jasmine rice", qty: "300g (dry)", forKid: true },
      { item: "Hoisin sauce", qty: "3 tbsp", forKid: false },
      { item: "Fresh ginger", qty: "thumb", forKid: false },
      { item: "Cucumber", qty: "1", forKid: true },
      { item: "Spring onions", qty: "4", forKid: true },
      { item: "Lime", qty: "1", forKid: true },
    ],
    method: [
      "Cook rice. Thinly slice cucumber, toss with rice vinegar and a pinch of sugar.",
      "Brown mince in a hot pan, breaking up. Drain excess fat.",
      "Add grated ginger, hoisin and soy sauce. Cook 3 min until sticky.",
      "Serve over rice with pickled cucumber and sliced spring onions."
    ],
    staples: ["Soy sauce", "Rice vinegar", "Sugar", "Salt", "Black pepper", "Sesame oil"],
    kidNotes: "Serve kid's portion before hoisin goes in — plain seasoned mince over rice."
  },
  {
    id: 14, name: "Baked Lemon Chicken Orzo", tag: "Family Favourite",
    time: "40 min", kcal: 595, protein: 51,
    desc: "One-pan lemon chicken baked with orzo, spinach and parmesan.",
    ingredients: [
      { item: "Chicken thighs (bone-in, skin-on)", qty: "6 pieces", forKid: true },
      { item: "Orzo", qty: "300g", forKid: true },
      { item: "Chicken stock (cube)", qty: "700ml", forKid: true },
      { item: "Baby spinach", qty: "100g", forKid: true },
      { item: "Parmesan", qty: "60g", forKid: true },
      { item: "Lemon", qty: "2", forKid: true },
      { item: "Garlic cloves", qty: "4", forKid: true },
      { item: "Onion", qty: "1", forKid: true },
    ],
    method: [
      "Preheat oven to 200°C. Season chicken, sear skin-down in oven-safe pan until golden.",
      "Remove chicken. Soften onion and garlic in same pan. Add orzo, stock, lemon zest.",
      "Nestle chicken back in skin-up. Bake 25 min until chicken cooked and orzo tender.",
      "Stir in spinach and parmesan. Rest 5 min before serving."
    ],
    staples: ["Olive oil", "Salt", "Black pepper", "Dried thyme"],
    kidNotes: "Great as-is. Remove skin for younger kids if preferred."
  },
  {
    id: 15, name: "Thai Green Prawn Curry", tag: "Bold Flavour",
    time: "25 min", kcal: 590, protein: 52,
    desc: "Fragrant green curry with king prawns, courgette and jasmine rice.",
    ingredients: [
      { item: "Raw king prawns (peeled)", qty: "500g", forKid: true },
      { item: "Coconut milk (tin)", qty: "400ml", forKid: true },
      { item: "Thai green curry paste", qty: "3 tbsp", forKid: false },
      { item: "Jasmine rice", qty: "300g (dry)", forKid: true },
      { item: "Courgette", qty: "2", forKid: true },
      { item: "Mangetout", qty: "150g", forKid: true },
      { item: "Lime", qty: "2", forKid: true },
      { item: "Fresh coriander", qty: "small bunch", forKid: false },
    ],
    method: [
      "Cook rice. Fry curry paste in a splash of oil for 1 min until fragrant.",
      "Add coconut milk and bring to a simmer. Add sliced courgette, cook 5 min.",
      "Add prawns and mangetout. Cook 3–4 min until prawns are pink.",
      "Serve over rice with lime wedges and fresh coriander."
    ],
    staples: ["Olive oil", "Fish sauce", "Soy sauce"],
    kidNotes: "Set aside kid's portion of rice, courgette and a few plain prawns before adding curry paste."
  },
  {
    id: 16, name: "Smoky Pulled Chicken Burgers", tag: "Weekend Vibes",
    time: "45 min", kcal: 605, protein: 51,
    desc: "Slow-cooked smoky pulled chicken in brioche buns with slaw and pickles.",
    ingredients: [
      { item: "Chicken breasts", qty: "700g", forKid: true },
      { item: "Brioche burger buns", qty: "4", forKid: true },
      { item: "Smoked paprika", qty: "2 tsp", forKid: true },
      { item: "Tomato ketchup", qty: "3 tbsp", forKid: true },
      { item: "Red cabbage", qty: "¼ head", forKid: true },
      { item: "Carrot", qty: "1", forKid: true },
      { item: "Pickles / gherkins", qty: "handful", forKid: false },
      { item: "Greek yoghurt", qty: "100g", forKid: true },
    ],
    method: [
      "Season chicken with smoked paprika, salt and pepper. Bake at 180°C for 30 min.",
      "Rest, then shred with two forks. Toss in ketchup, Worcestershire and a splash of vinegar.",
      "Make slaw: shred cabbage and carrot, mix with yoghurt, lemon juice and salt.",
      "Toast buns. Load with pulled chicken, slaw and pickles."
    ],
    staples: ["Worcestershire sauce", "Olive oil", "Salt", "Black pepper", "Balsamic vinegar"],
    kidNotes: "Kid gets plain pulled chicken in a bun with slaw on the side. Skip pickles."
  },
  {
    id: 17, name: "Seared Duck Breast & Puy Lentils", tag: "Weekend Vibes",
    time: "40 min", kcal: 610, protein: 52,
    desc: "Crispy duck breast over warm Puy lentils with roasted beetroot and wilted greens.",
    ingredients: [
      { item: "Duck breasts", qty: "3", forKid: true },
      { item: "Puy lentils (tin or pouch)", qty: "2 × 250g", forKid: true },
      { item: "Cooked beetroot", qty: "200g", forKid: true },
      { item: "Baby kale or spinach", qty: "100g", forKid: true },
      { item: "Shallots", qty: "2", forKid: true },
      { item: "Red wine vinegar", qty: "2 tbsp", forKid: false },
      { item: "Lemon", qty: "1", forKid: true },
    ],
    method: [
      "Score duck skin, season. Place skin-down in cold pan, bring to medium heat. Cook 10 min.",
      "Flip, cook 5 more min (medium-rare). Rest 5 min before slicing.",
      "Soften shallots. Add lentils, red wine vinegar, salt. Warm through.",
      "Wilt greens in the same pan. Serve duck over lentils with beetroot and greens."
    ],
    staples: ["Olive oil", "Salt", "Black pepper", "Dried thyme"],
    kidNotes: "Duck is rich — serve a smaller portion. Skip the vinegar dressing for kids."
  },
  {
    id: 18, name: "Chicken Shawarma Bowls", tag: "High Protein",
    time: "35 min", kcal: 600, protein: 53,
    desc: "Spiced chicken with hummus, tabbouleh, flatbread and a garlic yoghurt.",
    ingredients: [
      { item: "Chicken thighs (skinless, boneless)", qty: "800g", forKid: true },
      { item: "Bulgur wheat", qty: "250g (dry)", forKid: true },
      { item: "Hummus", qty: "200g", forKid: true },
      { item: "Flatbreads", qty: "4", forKid: true },
      { item: "Cherry tomatoes", qty: "200g", forKid: true },
      { item: "Cucumber", qty: "½", forKid: true },
      { item: "Greek yoghurt", qty: "150g", forKid: true },
      { item: "Lemon", qty: "2", forKid: true },
      { item: "Fresh parsley", qty: "bunch", forKid: true },
    ],
    method: [
      "Marinate chicken in cumin, paprika, turmeric, lemon and olive oil for 20 min if possible.",
      "Grill or pan-fry chicken 5–6 min each side. Rest and slice.",
      "Cook bulgur. Mix with chopped tomato, cucumber, parsley, lemon for tabbouleh.",
      "Serve over bulgur with hummus, flatbread and garlic yoghurt (yoghurt + garlic + lemon)."
    ],
    staples: ["Cumin", "Paprika", "Turmeric", "Olive oil", "Salt", "Black pepper", "Garlic powder"],
    kidNotes: "Mild and popular — chicken, hummus and flatbread is a winner."
  },
  {
    id: 19, name: "Creamy Mushroom & Tarragon Pasta", tag: "Comfort",
    time: "25 min", kcal: 585, protein: 50,
    desc: "Chestnut mushrooms in a creamy white wine sauce with spaghetti and crispy pancetta.",
    ingredients: [
      { item: "Spaghetti", qty: "350g", forKid: true },
      { item: "Chestnut mushrooms", qty: "400g", forKid: true },
      { item: "Pancetta or smoked bacon lardons", qty: "150g", forKid: true },
      { item: "Double cream", qty: "200ml", forKid: true },
      { item: "White wine", qty: "100ml", forKid: false },
      { item: "Parmesan", qty: "60g", forKid: true },
      { item: "Shallots", qty: "2", forKid: true },
      { item: "Garlic cloves", qty: "3", forKid: true },
      { item: "Fresh tarragon", qty: "small bunch", forKid: false },
    ],
    method: [
      "Cook spaghetti. Fry pancetta until crispy, remove.",
      "In same pan, soften shallots and garlic. Add sliced mushrooms, cook until golden.",
      "Add white wine, reduce by half. Add cream, simmer 3 min.",
      "Toss with pasta, pancetta, parmesan and fresh tarragon."
    ],
    staples: ["Olive oil", "Salt", "Black pepper", "Dried tarragon"],
    kidNotes: "Set aside plain pasta with mushrooms and pancetta before adding wine and cream."
  },
  {
    id: 20, name: "Spiced Lamb & Spinach Curry", tag: "Comfort",
    time: "50 min", kcal: 608, protein: 51,
    desc: "Slow-simmered lamb shoulder with spinach, tomatoes and basmati rice.",
    ingredients: [
      { item: "Lamb shoulder (diced)", qty: "700g", forKid: true },
      { item: "Basmati rice", qty: "300g (dry)", forKid: true },
      { item: "Baby spinach", qty: "150g", forKid: true },
      { item: "Chopped tomatoes (tin)", qty: "400g", forKid: true },
      { item: "Onion", qty: "2", forKid: true },
      { item: "Garlic cloves", qty: "4", forKid: true },
      { item: "Fresh ginger", qty: "thumb", forKid: true },
      { item: "Mild curry powder", qty: "3 tbsp", forKid: true },
      { item: "Greek yoghurt", qty: "150g", forKid: true },
    ],
    method: [
      "Brown lamb in batches, remove. Soften onion, garlic and ginger.",
      "Add curry powder, cook 1 min. Return lamb with tomatoes and 200ml water.",
      "Simmer covered 35 min until tender. Add spinach, cook until wilted.",
      "Stir in yoghurt off heat. Serve with basmati."
    ],
    staples: ["Olive oil", "Salt", "Black pepper", "Cumin", "Turmeric", "Coriander (ground)"],
    kidNotes: "Mild enough for kids. Serve yoghurt on the side."
  },
  {
    id: 21, name: "Cod & Chorizo Traybake", tag: "Quick",
    time: "30 min", kcal: 588, protein: 53,
    desc: "Flaky cod fillets over roasted new potatoes, chorizo, peppers and cherry tomatoes.",
    ingredients: [
      { item: "Cod fillets", qty: "4 × 160g", forKid: true },
      { item: "New potatoes", qty: "500g", forKid: true },
      { item: "Cooking chorizo", qty: "120g", forKid: true },
      { item: "Red pepper", qty: "2", forKid: true },
      { item: "Cherry tomatoes", qty: "200g", forKid: true },
      { item: "Lemon", qty: "1", forKid: true },
      { item: "Fresh parsley", qty: "small bunch", forKid: true },
    ],
    method: [
      "Preheat oven to 200°C. Halve potatoes, toss with olive oil and paprika, roast 15 min.",
      "Add sliced chorizo, peppers and tomatoes to tray. Roast 10 more min.",
      "Nestle cod on top, season. Roast 12–15 min until cod flakes easily.",
      "Finish with lemon juice and fresh parsley."
    ],
    staples: ["Olive oil", "Paprika", "Salt", "Black pepper"],
    kidNotes: "Great one-tray dinner for kids. Serve cod with potatoes and tomatoes."
  },
  {
    id: 22, name: "Vietnamese Pork Lettuce Cups", tag: "Light",
    time: "25 min", kcal: 578, protein: 50,
    desc: "Fragrant minced pork with vermicelli, fresh herbs and a nuoc cham dipping sauce.",
    ingredients: [
      { item: "Pork mince", qty: "600g", forKid: true },
      { item: "Rice vermicelli noodles", qty: "200g", forKid: true },
      { item: "Iceberg or butter lettuce", qty: "1 head", forKid: true },
      { item: "Cucumber", qty: "1", forKid: true },
      { item: "Carrot", qty: "2", forKid: true },
      { item: "Fresh mint", qty: "bunch", forKid: true },
      { item: "Fresh coriander", qty: "bunch", forKid: false },
      { item: "Lime", qty: "2", forKid: true },
    ],
    method: [
      "Soak vermicelli per pack. Julienne carrot and cucumber.",
      "Brown pork mince with ginger, garlic and fish sauce. Add lime juice at end.",
      "Make nuoc cham: lime juice, fish sauce, sugar, chilli, water.",
      "Serve mince in lettuce cups with noodles, veg and herbs. Dip in sauce."
    ],
    staples: ["Fish sauce", "Soy sauce", "Sugar", "Chilli flakes", "Garlic powder"],
    kidNotes: "Kids love building their own lettuce cups. Skip chilli in the sauce for their portion."
  },
  {
    id: 23, name: "Roast Chicken Thighs & Ratatouille", tag: "Family Favourite",
    time: "50 min", kcal: 592, protein: 50,
    desc: "Crispy-skinned chicken thighs over slow-roasted Mediterranean vegetables.",
    ingredients: [
      { item: "Chicken thighs (bone-in, skin-on)", qty: "6 pieces", forKid: true },
      { item: "Aubergine", qty: "1", forKid: true },
      { item: "Courgette", qty: "2", forKid: true },
      { item: "Red pepper", qty: "2", forKid: true },
      { item: "Chopped tomatoes (tin)", qty: "400g", forKid: true },
      { item: "Onion", qty: "1", forKid: true },
      { item: "Garlic cloves", qty: "4", forKid: true },
    ],
    method: [
      "Preheat oven to 200°C. Cube aubergine, courgette, pepper. Toss in olive oil, season.",
      "Roast veg 20 min. Add tinned tomatoes, onion and garlic, stir.",
      "Lay chicken on top skin-up. Roast 25 min until skin is crispy and chicken cooked.",
      "Rest 5 min. Serve chicken over ratatouille."
    ],
    staples: ["Olive oil", "Salt", "Black pepper", "Dried thyme", "Dried oregano", "Balsamic vinegar"],
    kidNotes: "Ratatouille is naturally mild. Remove skin for young children."
  },
  {
    id: 24, name: "Spiced Chickpea & Cauliflower Bowl", tag: "Plant Power",
    time: "35 min", kcal: 580, protein: 50,
    desc: "Roasted spiced cauliflower and chickpeas over brown rice with tahini dressing.",
    ingredients: [
      { item: "Cauliflower", qty: "1 large head", forKid: true },
      { item: "Chickpeas (tin)", qty: "2 × 400g", forKid: true },
      { item: "Brown rice", qty: "300g (dry)", forKid: true },
      { item: "Tahini", qty: "3 tbsp", forKid: true },
      { item: "Lemon", qty: "2", forKid: true },
      { item: "Garlic cloves", qty: "2", forKid: true },
      { item: "Cherry tomatoes", qty: "200g", forKid: true },
      { item: "Fresh parsley", qty: "bunch", forKid: true },
    ],
    method: [
      "Cook brown rice. Cut cauliflower into florets. Toss with chickpeas, olive oil and spices.",
      "Roast at 200°C for 25 min until caramelised.",
      "Make dressing: tahini, lemon juice, garlic, water to loosen.",
      "Serve over rice with tomatoes, parsley and tahini dressing."
    ],
    staples: ["Olive oil", "Cumin", "Paprika", "Turmeric", "Salt", "Black pepper"],
    kidNotes: "Plain roasted cauliflower and chickpeas over rice is a solid kid plate."
  },
  {
    id: 25, name: "Grilled Swordfish with Salsa Verde", tag: "Lean",
    time: "25 min", kcal: 582, protein: 54,
    desc: "Meaty swordfish steaks with herby salsa verde, crushed potatoes and fine beans.",
    ingredients: [
      { item: "Swordfish steaks", qty: "4 × 160g", forKid: true },
      { item: "New potatoes", qty: "600g", forKid: true },
      { item: "Fine green beans", qty: "200g", forKid: true },
      { item: "Capers", qty: "2 tbsp", forKid: false },
      { item: "Fresh parsley", qty: "large bunch", forKid: true },
      { item: "Anchovy fillets", qty: "4", forKid: false },
      { item: "Lemon", qty: "2", forKid: true },
      { item: "Garlic cloves", qty: "1", forKid: false },
    ],
    method: [
      "Boil potatoes until tender, drain and lightly crush. Blanch green beans.",
      "Blend parsley, capers, anchovies, garlic, lemon and olive oil for salsa verde.",
      "Season swordfish, griddle 3 min each side.",
      "Serve over potatoes and beans, spoon salsa verde over."
    ],
    staples: ["Olive oil", "Salt", "Black pepper"],
    kidNotes: "Plain grilled swordfish is mild and meaty — good for kids. Skip salsa verde."
  },
  {
    id: 26, name: "Chicken & Leek Pie (Shortcrust Top)", tag: "Comfort",
    time: "55 min", kcal: 610, protein: 50,
    desc: "Creamy chicken and leek filling under a golden shortcrust pastry lid.",
    ingredients: [
      { item: "Chicken breasts", qty: "600g", forKid: true },
      { item: "Leeks", qty: "3", forKid: true },
      { item: "Ready-rolled shortcrust pastry", qty: "1 sheet", forKid: true },
      { item: "Chicken stock (cube)", qty: "300ml", forKid: true },
      { item: "Double cream", qty: "150ml", forKid: true },
      { item: "Plain flour", qty: "2 tbsp", forKid: true },
      { item: "Butter", qty: "30g", forKid: true },
      { item: "Egg", qty: "1 (for wash)", forKid: true },
    ],
    method: [
      "Preheat oven to 190°C. Dice chicken and brown. Remove.",
      "Melt butter, soften sliced leeks 5 min. Add flour, cook 1 min. Add stock and cream.",
      "Return chicken. Season. Pour into baking dish.",
      "Top with pastry, trim, brush with egg wash. Bake 25–30 min until golden."
    ],
    staples: ["Olive oil", "Salt", "Black pepper", "Dried thyme"],
    kidNotes: "A natural crowd-pleaser. Serve with peas on the side."
  },
  {
    id: 27, name: "Miso Glazed Aubergine with Soba", tag: "Plant Power",
    time: "30 min", kcal: 575, protein: 50,
    desc: "Umami-rich miso-glazed aubergine over soba noodles with edamame and sesame.",
    ingredients: [
      { item: "Aubergine", qty: "3", forKid: true },
      { item: "Soba noodles", qty: "300g", forKid: true },
      { item: "Edamame (frozen)", qty: "200g", forKid: true },
      { item: "White miso paste", qty: "3 tbsp", forKid: false },
      { item: "Firm tofu", qty: "400g", forKid: true },
      { item: "Spring onions", qty: "4", forKid: true },
      { item: "Lime", qty: "1", forKid: true },
    ],
    method: [
      "Halve aubergines, score flesh. Mix miso, honey and soy for glaze. Brush over flesh.",
      "Roast aubergine at 200°C for 25 min. Press and cube tofu, pan-fry until golden.",
      "Cook soba per pack. Blanch edamame.",
      "Serve aubergine and tofu over soba with edamame, spring onion and lime."
    ],
    staples: ["Soy sauce", "Honey", "Sesame oil", "Salt", "Black pepper"],
    kidNotes: "Plain soba with edamame and tofu. Skip miso glaze — season with a little soy."
  },
  {
    id: 28, name: "Chilli Con Carne", tag: "Family Favourite",
    time: "45 min", kcal: 595, protein: 51,
    desc: "Rich beef chilli with kidney beans, served with rice, sour cream and cheddar.",
    ingredients: [
      { item: "Beef mince (lean)", qty: "600g", forKid: true },
      { item: "Kidney beans (tin)", qty: "400g", forKid: true },
      { item: "Chopped tomatoes (tin)", qty: "400g", forKid: true },
      { item: "Basmati rice", qty: "300g (dry)", forKid: true },
      { item: "Onion", qty: "1", forKid: true },
      { item: "Garlic cloves", qty: "3", forKid: true },
      { item: "Sour cream", qty: "150ml", forKid: true },
      { item: "Cheddar", qty: "80g", forKid: true },
      { item: "Tomato purée", qty: "2 tbsp", forKid: true },
    ],
    method: [
      "Brown mince, add diced onion and garlic. Cook until softened.",
      "Add tomato purée, chilli, cumin, smoked paprika. Cook 1 min.",
      "Add tomatoes and kidney beans. Simmer 25 min.",
      "Serve over rice with sour cream and grated cheddar."
    ],
    staples: ["Chilli flakes", "Cumin", "Paprika", "Salt", "Black pepper", "Olive oil"],
    kidNotes: "Reduce chilli for kids — the base is naturally mild. Cheese and sour cream are a hit."
  },
  {
    id: 29, name: "Pan-Seared Trout with Almonds & Capers", tag: "Omega-3",
    time: "20 min", kcal: 583, protein: 52,
    desc: "Crispy trout fillets with a brown butter, almond and caper sauce, served with new potatoes.",
    ingredients: [
      { item: "Trout fillets", qty: "4 × 160g", forKid: true },
      { item: "New potatoes", qty: "500g", forKid: true },
      { item: "Fine green beans", qty: "200g", forKid: true },
      { item: "Flaked almonds", qty: "40g", forKid: true },
      { item: "Capers", qty: "2 tbsp", forKid: false },
      { item: "Butter", qty: "40g", forKid: true },
      { item: "Lemon", qty: "2", forKid: true },
      { item: "Fresh parsley", qty: "small bunch", forKid: true },
    ],
    method: [
      "Boil potatoes 15 min. Blanch green beans.",
      "Season trout, pan-fry skin-down in olive oil 4 min. Flip, cook 2 more min. Remove.",
      "In same pan, melt butter until nutty brown. Add almonds, capers and lemon juice.",
      "Pour sauce over trout. Serve with potatoes and beans."
    ],
    staples: ["Olive oil", "Salt", "Black pepper"],
    kidNotes: "Trout is mild and kid-friendly. Skip capers, serve with plain butter sauce."
  },
  {
    id: 30, name: "BBQ Chicken & Corn Loaded Quesadillas", tag: "Quick",
    time: "25 min", kcal: 597, protein: 50,
    desc: "Crispy quesadillas stuffed with BBQ pulled chicken, corn, black beans and melted cheddar.",
    ingredients: [
      { item: "Chicken breasts", qty: "600g", forKid: true },
      { item: "Large flour tortillas", qty: "6", forKid: true },
      { item: "Cheddar", qty: "150g", forKid: true },
      { item: "Black beans (tin)", qty: "400g", forKid: true },
      { item: "Sweetcorn (tin)", qty: "200g", forKid: true },
      { item: "BBQ sauce", qty: "4 tbsp", forKid: true },
      { item: "Sour cream", qty: "100ml", forKid: true },
      { item: "Avocado", qty: "1", forKid: true },
    ],
    method: [
      "Cook and shred chicken. Mix with BBQ sauce.",
      "Drain beans and corn. Grate cheese.",
      "Layer tortilla: chicken, beans, corn, cheese. Top with second tortilla.",
      "Cook in dry pan 3 min each side until golden and cheese melted. Serve with sour cream and sliced avocado."
    ],
    staples: ["Olive oil", "Salt", "Black pepper", "Chilli flakes"],
    kidNotes: "Kids love quesadillas. Use mild BBQ sauce. Avocado on the side."
  },
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Words in an ingredient name that mark it as a pantry staple
const STAPLE_KEYWORDS = [
  // oils & fats
  "oil","butter",
  // sweeteners
  "honey","maple syrup","sugar","syrup",
  // vinegars & sauces
  "vinegar","soy sauce","fish sauce","worcestershire","hot sauce","sriracha","tahini","miso",
  // condiments & pastes
  "mustard","tomato purée","tomato puree","harissa","paste","mirin","rice wine",
  // herbs (fresh counted as staple too)
  "coriander","parsley","mint","basil","thyme","rosemary","bay","dill","chive","oregano","sage",
  // spices & seasonings
  "cumin","paprika","turmeric","chilli","chili","pepper","cinnamon","cardamom","garam masala",
  "curry powder","mixed spice","nutmeg","clove","star anise","cayenne","saffron","sumac",
  "za'atar","dried","ground","powder","flakes","seeds","seed",
  // seeds & nuts used in small qty
  "sesame","poppy","fennel seed","pine nut","almond flake",
  // salt
  "salt",
  // leavening / baking
  "baking powder","baking soda","bicarbonate","cornflour","cornstarch","flour",
  // aromatics used in tiny qty
  "vanilla","bay leaf",
];

function isStapleItem(itemName, qtys) {
  const name = itemName.toLowerCase();
  // Always a staple if measured in spoons
  const qtyStr = (Array.isArray(qtys) ? qtys : [qtys]).join(" ").toLowerCase();
  if (/tbsp|tsp/.test(qtyStr)) return true;
  // Staple if name contains a staple keyword
  return STAPLE_KEYWORDS.some(kw => name.includes(kw));
}

const tagColors = {
  "High Protein": "#6E7F58", "Quick": "#B0713B", "Omega-3": "#5B7B8C",
  "Family Favourite": "#8A6BAB", "Weekend Vibes": "#B0713B", "Comfort": "#8A7A4A",
  "Lean": "#6E7F58", "Bold Flavour": "#A15C42", "Light": "#5B7B8C",
  "Plant Power": "#6E7F58", "Imported": "#8A7A62",
};

function shuffleRecipes(catalogue) {
  const pool = [...catalogue].sort(() => Math.random() - 0.5);
  return DAYS.map((_, i) => pool[i % pool.length].id);
}

function buildShoppingList(selectedIds, catalogue) {
  const recipes = selectedIds.map(id => catalogue.find(r => r.id === id)).filter(Boolean);
  const itemMap = {};
  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ing => {
      const key = ing.item.toLowerCase();
      if (!itemMap[key]) itemMap[key] = { item: ing.item, qty: [ing.qty], forKid: ing.forKid };
      else itemMap[key].qty.push(ing.qty);
    });
  });
  return Object.values(itemMap);
}

// ── IMPORT MODAL ──────────────────────────────────────────────────────────────
function ImportModal({ onClose, onImport, apiKey, setApiKey }) {
  const [stage, setStage] = useState("upload"); // upload | reviewing | done
  const [mode, setMode] = useState("file"); // file | url
  const [imageData, setImageData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [urlInput, setUrlInput] = useState("");
  const [parsed, setParsed] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileRef = useRef();

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target.result.split(",")[1];
      setImageData({ base64, mediaType: file.type });
      setImagePreview(ev.target.result);
    };
    reader.readAsDataURL(file);
  }

  async function fetchImageFromUrl() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/fetch-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlInput.trim() })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch URL');

      if (data.type === 'image') {
        setImageData({ base64: data.base64, mediaType: data.mediaType });
        setImagePreview(`data:${data.mediaType};base64,${data.base64}`);
      } else if (data.type === 'html') {
        // No image — pass the text directly to Claude
        setImageData({ htmlText: data.text });
        setImagePreview(null);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function runImport() {
    if (!apiKey.trim()) { setError("No API key found."); return; }
    if (!imageData) { setError("Upload a screenshot or fetch a URL first."); return; }
    setLoading(true);
    setError(null);
    try {
      const prompt = `You are a recipe parser. Extract the recipe and return ONLY a JSON object with this exact structure — no markdown, no backticks, just raw JSON:

{
  "name": "Recipe Name",
  "time": "X min",
  "tag": "one of: Quick, High Protein, Comfort, Light, Lean, Family Favourite, Plant Power, Bold Flavour, Weekend Vibes, Omega-3, Imported",
  "desc": "one sentence description",
  "kcal": 600,
  "protein": 50,
  "ingredients": [
    { "item": "ingredient name", "qty": "quantity for 2 adults + 1 child (scale so adults hit ~600 kcal and ~50g protein each)", "forKid": true }
  ],
  "method": ["step 1", "step 2", "step 3", "step 4"],
  "staples": ["any staple herbs/spices used"],
  "kidNotes": "brief note on how to adapt for a child"
}

IMPORTANT:
- Scale ALL quantities so 2 adults each get ~600 kcal and ~50g protein
- Add ~30% extra for one child portion (smaller portion, milder where needed)
- forKid is false only for very spicy or adult-specific ingredients
- Estimate kcal and protein based on ingredients — be realistic
- If kcal/protein info is shown, use those as your base and scale accordingly`;

      // Build message content — image or plain text depending on source
      const content = imageData.htmlText
        ? [{ type: "text", text: `${prompt}\n\nRecipe page content:\n\n${imageData.htmlText}` }]
        : [
            { type: "image", source: { type: "base64", media_type: imageData.mediaType, data: imageData.base64 } },
            { type: "text", text: prompt }
          ];

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey.trim(),
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1500,
          messages: [{ role: "user", content }]
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error?.message || "Claude API error");
      }

      const data = await res.json();
      const text = data.content[0].text.trim();
      const clean = text.replace(/```json|```/g, "").trim();
      const recipe = JSON.parse(clean);
      setParsed(recipe);
      setStage("reviewing");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function confirmImport() {
    const newRecipe = {
      ...parsed,
      id: Date.now(),
    };
    onImport(newRecipe);
    setStage("done");
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(51,41,30,0.75)", zIndex: 300, display: "flex", alignItems: "flex-end" }}
      onClick={onClose}>
      <div style={{
        fontFamily: "'Karla', sans-serif", background: "#F7F2E9", borderRadius: "6px 6px 0 0", width: "100%", maxHeight: "90vh", overflowY: "auto", padding: "22px 22px 44px",
        backgroundImage: "radial-gradient(#e9e0d0 0.6px, transparent 0.6px)", backgroundSize: "14px 14px"
      }}
        onClick={e => e.stopPropagation()}>
        <div style={{ width: 36, height: 3, background: "#DDD2BE", borderRadius: 2, margin: "0 auto 20px" }} />

        {stage === "done" ? (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: 20, color: "#B0713B", marginBottom: 8 }}>Added to the collection</div>
            <div style={{ color: "#5A4E3C", fontSize: 14, marginBottom: 24 }}>{parsed?.name}</div>
            <div onClick={onClose} style={{ display: "inline-block", fontSize: 14, fontWeight: 700, color: "#33291E", borderBottom: "1.5px solid #B0713B", cursor: "pointer" }}>done</div>
          </div>
        ) : stage === "reviewing" && parsed ? (
          <>
            <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 560, fontSize: 19, marginBottom: 4 }}>Review the recipe</div>
            <div style={{ color: "#8A7A62", fontSize: 13, marginBottom: 18 }}>Quantities scaled to your macro targets, plus a portion for the small person.</div>

            <div style={{ borderTop: "1px solid #DDD2BE", borderBottom: "1px solid #DDD2BE", padding: "14px 0", marginBottom: 16 }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 560, fontSize: 18, marginBottom: 4 }}>{parsed.name}</div>
              <div style={{ color: "#8A7A62", fontSize: 13, marginBottom: 10, fontStyle: "italic", fontFamily: "'Fraunces', serif" }}>{parsed.desc}</div>
              <div style={{ display: "flex", gap: 16, fontSize: 13 }}>
                <span style={{ color: "#B0713B", fontWeight: 700 }}>{parsed.kcal} kcal</span>
                <span style={{ color: "#8A7A62" }}>{parsed.protein}g protein</span>
                <span style={{ color: "#8A7A62" }}>{parsed.time}</span>
              </div>
            </div>

            <div style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: 14, color: "#B0713B", marginBottom: 8 }}>Ingredients</div>
            {parsed.ingredients?.map((ing, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #E4DAC7", fontSize: 13.5 }}>
                <span style={{ color: "#33291E" }}>{ing.item}</span><span style={{ fontWeight: 700, color: "#8A6B4A" }}>{ing.qty}</span>
              </div>
            ))}

            {parsed.kidNotes && (
              <div style={{ padding: "12px 0 12px 14px", margin: "16px 0", borderLeft: "3px solid #B0713B" }}>
                <div style={{ fontWeight: 700, fontSize: 11.5, letterSpacing: "0.4px", textTransform: "uppercase", color: "#33291E", marginBottom: 3 }}>For the small person</div>
                <div style={{ fontSize: 13, color: "#5A4E3C" }}>{parsed.kidNotes}</div>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 22, paddingTop: 16, borderTop: "2.5px solid #33291E" }}>
              <span onClick={() => setStage("upload")} style={{ fontSize: 13, fontWeight: 700, color: "#8A7A62", cursor: "pointer" }}>← redo</span>
              <span onClick={confirmImport} style={{ fontSize: 14, fontWeight: 700, color: "#33291E", borderBottom: "1.5px solid #B0713B", cursor: "pointer" }}>add to collection ✓</span>
            </div>
          </>
        ) : (
          <>
            <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 560, fontSize: 19, marginBottom: 4 }}>Import a recipe</div>
            <div style={{ color: "#8A7A62", fontSize: 13, marginBottom: 18 }}>Upload a screenshot, or paste a URL from a recipe site.</div>

            {/* API Key — hidden when set via env variable */}
            {!import.meta.env.VITE_CLAUDE_KEY && (
              <div style={{ marginBottom: 18, paddingBottom: 18, borderBottom: "1px solid #DDD2BE" }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 6 }}>Anthropic API key</div>
                <input
                  type="password"
                  placeholder="sk-ant-..."
                  value={apiKey}
                  onChange={e => setApiKey(e.target.value)}
                  style={{ width: "100%", border: "none", borderBottom: "1.5px solid #DDD2BE", background: "transparent", padding: "6px 0", fontSize: 14, boxSizing: "border-box", fontFamily: "monospace" }}
                />
                <div style={{ color: "#A99879", fontSize: 11, marginTop: 4 }}>console.anthropic.com</div>
              </div>
            )}

            {/* Mode tabs */}
            <div style={{ display: "flex", gap: 20, marginBottom: 16 }}>
              {[["file", "screenshot"], ["url", "url"]].map(([m, label]) => (
                <span key={m} onClick={() => { setMode(m); setImageData(null); setImagePreview(null); setUrlInput(""); setError(null); }}
                  style={{ fontSize: 13.5, fontWeight: 700, cursor: "pointer", paddingBottom: 6, color: mode === m ? "#33291E" : "#A99879", borderBottom: mode === m ? "2.5px solid #B0713B" : "2.5px solid transparent" }}>
                  {label}
                </span>
              ))}
            </div>

            {mode === "file" ? (
              <>
                <div onClick={() => fileRef.current.click()}
                  style={{ border: "1.5px dashed #C9BBA1", borderRadius: 4, padding: "26px 16px", textAlign: "center", cursor: "pointer", marginBottom: 16, minHeight: 110 }}>
                  {imagePreview ? (
                    <img src={imagePreview} alt="preview" style={{ maxWidth: "100%", maxHeight: 190, objectFit: "contain" }} />
                  ) : (
                    <>
                      <div style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: 15, color: "#B0713B", marginBottom: 4 }}>Tap to upload</div>
                      <div style={{ color: "#A99879", fontSize: 12 }}>a screenshot, JPG or PNG</div>
                    </>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
              </>
            ) : (
              <>
                <div style={{ marginBottom: 14 }}>
                  <input
                    type="url"
                    placeholder="https://www.bbcgoodfood.com/recipes/..."
                    value={urlInput}
                    onChange={e => { setUrlInput(e.target.value); setImageData(null); setImagePreview(null); }}
                    style={{ width: "100%", border: "none", borderBottom: "1.5px solid #DDD2BE", background: "transparent", padding: "6px 0", fontSize: 14, boxSizing: "border-box" }}
                  />
                  <div style={{ color: "#A99879", fontSize: 11, marginTop: 4 }}>Recipe sites & direct image URLs. Instagram needs a screenshot.</div>
                </div>
                {urlInput && !imageData && (
                  <div onClick={fetchImageFromUrl}
                    style={{ fontSize: 13.5, fontWeight: 700, color: "#33291E", borderBottom: "1.5px solid #B0713B", display: "inline-block", cursor: "pointer", marginBottom: 16 }}>
                    {loading ? "fetching…" : "fetch recipe →"}
                  </div>
                )}
                {imageData?.htmlText && (
                  <div style={{ padding: "10px 0 10px 14px", borderLeft: "3px solid #6E7F58", marginBottom: 16 }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: "#33291E" }}>Page fetched</div>
                    <div style={{ fontSize: 12, color: "#8A7A62" }}>Recipe text extracted — ready to import.</div>
                  </div>
                )}
                {imagePreview && (
                  <div style={{ marginBottom: 16 }}>
                    <img src={imagePreview} alt="preview" style={{ width: "100%", maxHeight: 190, objectFit: "cover" }} />
                  </div>
                )}
              </>
            )}

            {error && (
              <div style={{ padding: "10px 0 10px 14px", borderLeft: "3px solid #A15C42", marginBottom: 16, fontSize: 13, color: "#A15C42" }}>
                {error}
              </div>
            )}

            <div style={{ paddingTop: 16, borderTop: "2.5px solid #33291E" }}>
              <span
                onClick={() => { if (!loading && imageData) runImport(); }}
                style={{ fontSize: 14, fontWeight: 700, cursor: loading || !imageData ? "default" : "pointer", color: loading || !imageData ? "#A99879" : "#33291E", borderBottom: loading || !imageData ? "1.5px solid transparent" : "1.5px solid #B0713B" }}>
                {loading ? "reading recipe…" : "import & scale recipe →"}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── SHOPPING ITEM ─────────────────────────────────────────────────────────────
function ShoppingItem({ item }) {
  const [checked, setChecked] = useState(false);
  const quantities = [...new Set(item.qty)].join(" + ");
  return (
    <div onClick={() => setChecked(!checked)} style={{ display: "flex", alignItems: "baseline", gap: 12, padding: "11px 0", borderBottom: "1px solid #DDD2BE", cursor: "pointer", opacity: checked ? 0.4 : 1 }}>
      <span style={{ fontFamily: "'Fraunces', serif", fontSize: 15, color: "#B0713B", width: 14, flexShrink: 0 }}>{checked ? "✓" : "·"}</span>
      <div style={{ flex: 1, fontSize: 14.5, color: "#33291E", textDecoration: checked ? "line-through" : "none" }}>{item.item}</div>
      <div style={{ fontSize: 13, color: "#8A7A62", fontWeight: 600 }}>{quantities}</div>
    </div>
  );
}

// ── SETTINGS MODAL ────────────────────────────────────────────────────────────
const DEFAULT_SETTINGS = {
  kcalTarget: 600,
  proteinTarget: 50,
  adults: 2,
  children: 1,
  excludeSpoons: true, // exclude staple pantry items from shopping list
};

function SettingsModal({ settings, onSave, onClose }) {
  const [draft, setDraft] = useState({ ...settings });

  function update(key, val) {
    setDraft(prev => ({ ...prev, [key]: val }));
  }

  function save() {
    onSave(draft);
    onClose();
  }

  const Field = ({ label, hint, children }) => (
    <div style={{ marginBottom: 24, paddingBottom: 20, borderBottom: "1px solid #DDD2BE" }}>
      <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 560, fontSize: 15, marginBottom: 2 }}>{label}</div>
      {hint && <div style={{ color: "#8A7A62", fontSize: 12, marginBottom: 10, lineHeight: 1.4 }}>{hint}</div>}
      {children}
    </div>
  );

  const NumInput = ({ value, onChange, min = 1, max = 10 }) => (
    <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
      <span onClick={() => onChange(Math.max(min, value - 1))} style={{ fontFamily: "'Fraunces', serif", fontSize: 20, color: "#B0713B", cursor: "pointer" }}>−</span>
      <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 22, minWidth: 24, textAlign: "center" }}>{value}</span>
      <span onClick={() => onChange(Math.min(max, value + 1))} style={{ fontFamily: "'Fraunces', serif", fontSize: 20, color: "#B0713B", cursor: "pointer" }}>+</span>
    </div>
  );

  const SliderInput = ({ value, onChange, min, max, step = 10, unit }) => (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ color: "#A99879", fontSize: 12 }}>{min}{unit}</span>
        <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 18, color: "#B0713B" }}>{value}{unit}</span>
        <span style={{ color: "#A99879", fontSize: 12 }}>{max}{unit}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: "#B0713B", height: 3 }} />
    </div>
  );

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(51,41,30,0.7)", zIndex: 300, display: "flex", alignItems: "flex-end" }} onClick={onClose}>
      <div style={{
        fontFamily: "'Karla', sans-serif", background: "#F7F2E9", borderRadius: "6px 6px 0 0", width: "100%", maxHeight: "88vh", overflowY: "auto", padding: "22px 22px 44px",
        backgroundImage: "radial-gradient(#e9e0d0 0.6px, transparent 0.6px)", backgroundSize: "14px 14px"
      }} onClick={e => e.stopPropagation()}>
        <div style={{ width: 36, height: 3, background: "#DDD2BE", borderRadius: 2, margin: "0 auto 20px" }} />
        <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 560, fontSize: 20, marginBottom: 4 }}>Settings</div>
        <div style={{ color: "#8A7A62", fontSize: 13, marginBottom: 22 }}>Applies to the shopping list, import scaling, and week overview.</div>

        <Field label="Calories per adult" hint="Target dinner portion, per adult">
          <SliderInput value={draft.kcalTarget} onChange={v => update("kcalTarget", v)} min={300} max={1000} step={25} unit=" kcal" />
        </Field>

        <Field label="Protein per adult" hint="Target dinner portion, per adult">
          <SliderInput value={draft.proteinTarget} onChange={v => update("proteinTarget", v)} min={20} max={100} step={5} unit="g" />
        </Field>

        <Field label="Adults" hint="Portions to cook for">
          <NumInput value={draft.adults} onChange={v => update("adults", v)} min={1} max={8} />
        </Field>

        <Field label="Children" hint="Smaller portions to cook for">
          <NumInput value={draft.children} onChange={v => update("children", v)} min={0} max={6} />
        </Field>

        <Field label="Shopping list" hint="Oils, honey, herbs, spices, seeds and condiments are treated as cupboard staples">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontSize: 14 }}>Hide staples from the list</div>
            <div onClick={() => update("excludeSpoons", !draft.excludeSpoons)} style={{ width: 40, height: 22, borderRadius: 12, background: draft.excludeSpoons ? "#B0713B" : "#DDD2BE", position: "relative", cursor: "pointer", flexShrink: 0 }}>
              <div style={{ position: "absolute", top: 3, left: draft.excludeSpoons ? 21 : 3, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "left 0.15s" }} />
            </div>
          </div>
        </Field>

        <div onClick={save} style={{ textAlign: "center", paddingTop: 4, fontSize: 14, fontWeight: 700, color: "#33291E", borderBottom: "1.5px solid #B0713B", display: "inline-block", cursor: "pointer" }}>
          save settings
        </div>
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function MealPlanner() {
  const [catalogue, setCatalogue] = useState(() => {
    try {
      const saved = localStorage.getItem("dp_imported");
      const imported = saved ? JSON.parse(saved) : [];
      return [...INITIAL_RECIPES, ...imported];
    } catch { return INITIAL_RECIPES; }
  });

  const [plan, setPlan] = useState(() => {
    try {
      const saved = localStorage.getItem("dp_plan");
      if (saved) return JSON.parse(saved);
    } catch {}
    return shuffleRecipes(INITIAL_RECIPES);
  });
  const [activeRecipe, setActiveRecipe] = useState(null);
  const [view, setView] = useState("plan");
  const [showImport, setShowImport] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_CLAUDE_KEY || "");

  const shoppingList = useMemo(() => {
    const list = buildShoppingList(plan, catalogue);
    if (!settings.excludeSpoons) return list;
    return list.filter(item => !isStapleItem(item.item, item.qty));
  }, [plan, catalogue, settings.excludeSpoons]);

  function swapRecipe(dayIndex) {
    const used = new Set(plan);
    const available = catalogue.filter(r => !used.has(r.id) || plan[dayIndex] === r.id);
    const others = available.filter(r => r.id !== plan[dayIndex]);
    if (others.length === 0) return;
    const next = others[Math.floor(Math.random() * others.length)];
    const newPlan = [...plan];
    newPlan[dayIndex] = next.id;
    setPlan(newPlan);
    try { localStorage.setItem("dp_plan", JSON.stringify(newPlan)); } catch {}
  }

  function regeneratePlan() {
    const newPlan = shuffleRecipes(catalogue);
    setPlan(newPlan);
    try { localStorage.setItem("dp_plan", JSON.stringify(newPlan)); } catch {}
  }

  function handleImport(recipe) {
    setCatalogue(prev => {
      const updated = [...prev, recipe];
      // Only save the imported ones (not INITIAL_RECIPES)
      const importedOnly = updated.filter(r => r.id > 1000);
      try { localStorage.setItem("dp_imported", JSON.stringify(importedOnly)); } catch {}
      return updated;
    });
  }

  const planRecipes = plan.map(id => catalogue.find(r => r.id === id));

  const currentDayIdx = (new Date().getDay() + 6) % 7; // Mon=0

  return (
    <div style={{
      fontFamily: "'Karla', -apple-system, sans-serif", background: "#F7F2E9", minHeight: "100vh", color: "#33291E",
      backgroundImage: "radial-gradient(#e9e0d0 0.6px, transparent 0.6px)", backgroundSize: "14px 14px"
    }}>

      {/* Header */}
      <div style={{ padding: "24px 20px 0", position: "sticky", top: 0, zIndex: 100, background: "#F7F2E9" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", borderBottom: "2.5px solid #33291E", paddingBottom: 10 }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 550, fontSize: 24, letterSpacing: "-0.5px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>🍽️</span> Dinner, planned.
          </div>
          <div style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
            <span onClick={() => setShowSettings(true)} style={{ fontSize: 12, fontWeight: 700, color: "#33291E", borderBottom: "1.5px solid #B0713B", paddingBottom: 1, cursor: "pointer" }}>settings</span>
            <span onClick={() => setShowImport(true)} style={{ fontSize: 12, fontWeight: 700, color: "#33291E", borderBottom: "1.5px solid #B0713B", paddingBottom: 1, cursor: "pointer" }}>import</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0 0", fontSize: 12.5, color: "#8A7A62" }}>
          <span>
            {settings.adults} adult{settings.adults !== 1 ? "s" : ""}{settings.children > 0 ? `, ${settings.children} small person${settings.children !== 1 ? "s" : ""}` : ""} · <em style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", color: "#B0713B" }}>~{settings.kcalTarget} kcal, {settings.proteinTarget}g protein</em>
          </span>
          <span onClick={regeneratePlan} style={{ fontSize: 12, fontWeight: 700, color: "#33291E", borderBottom: "1.5px solid #B0713B", paddingBottom: 1, cursor: "pointer", whiteSpace: "nowrap" }}>new week</span>
        </div>
        <nav style={{ display: "flex", gap: 22, padding: "16px 0 0" }}>
          {["plan", "shopping", "catalogue"].map(v => (
            <div key={v} onClick={() => setView(v)} style={{
              fontSize: 13.5, fontWeight: 700, cursor: "pointer", paddingBottom: 8,
              color: view === v ? "#33291E" : "#A99879",
              borderBottom: view === v ? "2.5px solid #B0713B" : "2.5px solid transparent"
            }}>
              {v === "plan" ? "This week" : v === "shopping" ? "Shopping" : `All recipes · ${catalogue.length}`}
            </div>
          ))}
        </nav>
      </div>

      <div style={{ padding: "4px 20px 90px" }}>
        {/* PLAN */}
        {view === "plan" && (
          <div>
            {DAYS.map((day, i) => {
              const recipe = planRecipes[i];
              if (!recipe) return null;
              const isToday = i === currentDayIdx;
              return (
                <div key={day} style={isToday ? {
                  display: "flex", gap: 16, alignItems: "center",
                  background: "#33291E", color: "#F7F2E9", borderRadius: 3,
                  padding: "18px 18px 16px", margin: "10px -6px", position: "relative"
                } : {
                  display: "flex", gap: 16, alignItems: "center",
                  padding: "17px 0", borderBottom: "1px solid #DDD2BE"
                }}>
                  {isToday && (
                    <div style={{ position: "absolute", top: -8, right: 14, background: "#B0713B", color: "#F7F2E9", fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "3px 9px", borderRadius: 2 }}>tonight</div>
                  )}
                  <div style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: 15, color: isToday ? "#D9A05B" : "#B0713B", width: 38, flexShrink: 0 }}>{day.slice(0, 3)}</div>
                  <div style={{ flex: 1, cursor: "pointer" }} onClick={() => setActiveRecipe(recipe)}>
                    <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase", color: isToday ? "#A3B28C" : (tagColors[recipe.tag] || "#8A7A62"), marginBottom: 4 }}>
                      {recipe.tag} · {recipe.time}
                    </div>
                    <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 560, fontSize: 17, lineHeight: 1.25, marginBottom: 5, letterSpacing: "-0.2px" }}>{recipe.name}</div>
                    <div style={{ fontSize: 12.5, color: isToday ? "#B5A488" : "#8A7A62", display: "flex", gap: 6, alignItems: "center" }}>
                      <span style={{ color: isToday ? "#D9A05B" : "#B0713B", fontWeight: 700 }}>{recipe.kcal} kcal</span>
                      <span style={{ color: "#C9BBA1" }}>·</span>
                      <span>{recipe.protein}g protein</span>
                    </div>
                  </div>
                  <div onClick={() => swapRecipe(i)} style={{ fontSize: 17, color: isToday ? "#B5A488" : "#C9BBA1", cursor: "pointer", flexShrink: 0 }}>⇄</div>
                </div>
              );
            })}
            <div style={{ marginTop: 24, paddingTop: 14, borderTop: "2.5px solid #33291E", fontSize: 12, color: "#8A7A62", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic" }}>Seven dinners, one list.</span>
              <span onClick={() => setShowImport(true)} style={{ fontWeight: 700, color: "#33291E", borderBottom: "1.5px solid #B0713B", cursor: "pointer" }}>+ import recipe</span>
            </div>
          </div>
        )}

        {/* SHOPPING */}
        {view === "shopping" && (
          <div style={{ paddingTop: 14 }}>
            <div style={{ borderBottom: "1px solid #DDD2BE", paddingBottom: 14, marginBottom: 4 }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 560, fontSize: 19 }}>This week's list</div>
              <div style={{ fontSize: 12.5, color: "#8A7A62", marginTop: 2 }}>Serves {settings.adults} adult{settings.adults !== 1 ? "s" : ""}{settings.children > 0 ? ` + ${settings.children} small person${settings.children !== 1 ? "s" : ""}` : ""} · staples left off</div>
            </div>
            {shoppingList.map((item, i) => <ShoppingItem key={i} item={item} />)}

            <div style={{ marginTop: 26, paddingTop: 16, borderTop: "2.5px solid #33291E" }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: 14, color: "#B0713B", marginBottom: 3 }}>Worth a check in the cupboard</div>
              <div style={{ fontSize: 12, color: "#8A7A62", marginBottom: 12 }}>Not on the list above — top up if you're running low.</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 16px", fontSize: 12.5, color: "#5A4E3C" }}>
                {STAPLES.map((s, i) => <span key={s}>{s}{i < STAPLES.length - 1 ? " ·" : ""}</span>)}
              </div>
            </div>
          </div>
        )}

        {/* CATALOGUE */}
        {view === "catalogue" && (
          <div style={{ paddingTop: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid #DDD2BE", paddingBottom: 12, marginBottom: 4 }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 560, fontSize: 19 }}>The collection</div>
              <span onClick={() => setShowImport(true)} style={{ fontSize: 12, fontWeight: 700, color: "#33291E", borderBottom: "1.5px solid #B0713B", cursor: "pointer" }}>+ import</span>
            </div>
            {catalogue.map(recipe => (
              <div key={recipe.id} onClick={() => setActiveRecipe(recipe)} style={{ padding: "16px 0", borderBottom: "1px solid #DDD2BE", cursor: "pointer" }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase", color: tagColors[recipe.tag] || "#8A7A62", marginBottom: 4, display: "flex", justifyContent: "space-between" }}>
                  <span>{recipe.tag} · {recipe.time}</span>
                  <span style={{ color: "#B0713B" }}>{recipe.kcal} kcal</span>
                </div>
                <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 560, fontSize: 17, marginBottom: 4 }}>{recipe.name}</div>
                <div style={{ color: "#8A7A62", fontSize: 13, lineHeight: 1.4 }}>{recipe.desc}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RECIPE MODAL */}
      {activeRecipe && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(51,41,30,0.75)", zIndex: 200, display: "flex", alignItems: "flex-end" }} onClick={() => setActiveRecipe(null)}>
          <div style={{
            fontFamily: "'Karla', sans-serif", background: "#F7F2E9", borderRadius: "6px 6px 0 0", width: "100%", maxHeight: "88vh", overflowY: "auto", padding: "22px 22px 40px",
            backgroundImage: "radial-gradient(#e9e0d0 0.6px, transparent 0.6px)", backgroundSize: "14px 14px"
          }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 36, height: 3, background: "#DDD2BE", borderRadius: 2, margin: "0 auto 20px" }} />

            <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase", color: tagColors[activeRecipe.tag] || "#8A7A62", marginBottom: 6 }}>
              {activeRecipe.tag} · {activeRecipe.time}
            </div>
            <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 560, fontSize: 24, marginBottom: 6, lineHeight: 1.2, letterSpacing: "-0.3px" }}>{activeRecipe.name}</div>
            <div style={{ color: "#8A7A62", fontSize: 14, marginBottom: 18, lineHeight: 1.5, fontStyle: "italic", fontFamily: "'Fraunces', serif" }}>{activeRecipe.desc}</div>

            <div style={{ display: "flex", gap: 24, marginBottom: 22, borderTop: "1px solid #DDD2BE", borderBottom: "1px solid #DDD2BE", padding: "12px 0" }}>
              <div>
                <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 20, color: "#B0713B" }}>{activeRecipe.kcal}</span>
                <span style={{ fontSize: 12, color: "#8A7A62" }}> kcal / adult</span>
              </div>
              <div>
                <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 20, color: "#33291E" }}>{activeRecipe.protein}g</span>
                <span style={{ fontSize: 12, color: "#8A7A62" }}> protein / adult</span>
              </div>
            </div>

            <div style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: 15, color: "#B0713B", marginBottom: 10 }}>Ingredients</div>
            <div style={{ marginBottom: 20 }}>
              {activeRecipe.ingredients?.map((ing, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #E4DAC7", fontSize: 14 }}>
                  <div style={{ color: "#33291E" }}>{ing.item}</div>
                  <div style={{ fontWeight: 700, color: "#8A6B4A" }}>{ing.qty}</div>
                </div>
              ))}
            </div>

            {activeRecipe.kidNotes && (
              <div style={{ padding: "12px 0 12px 14px", margin: "0 0 20px", borderLeft: "3px solid #B0713B" }}>
                <div style={{ fontWeight: 700, fontSize: 11.5, color: "#33291E", letterSpacing: "0.4px", textTransform: "uppercase", marginBottom: 3 }}>For the small person</div>
                <div style={{ fontSize: 13.5, color: "#5A4E3C", lineHeight: 1.5 }}>{activeRecipe.kidNotes}</div>
              </div>
            )}

            <div style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: 15, color: "#B0713B", marginBottom: 12 }}>Method</div>
            {activeRecipe.method?.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 14, marginBottom: 14 }}>
                <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 15, color: "#B0713B", width: 20, flexShrink: 0 }}>{i + 1}</div>
                <div style={{ fontSize: 14, lineHeight: 1.6, color: "#33291E" }}>{step}</div>
              </div>
            ))}

            {activeRecipe.staples?.length > 0 && (
              <div style={{ marginTop: 20, paddingTop: 14, borderTop: "1px solid #DDD2BE" }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: "#8A7A62", letterSpacing: "0.4px", textTransform: "uppercase", marginBottom: 6 }}>From the staples cupboard</div>
                <div style={{ fontSize: 13, color: "#5A4E3C" }}>{activeRecipe.staples.join(" · ")}</div>
              </div>
            )}
            <div onClick={() => setActiveRecipe(null)} style={{ textAlign: "center", marginTop: 26, paddingTop: 16, borderTop: "2.5px solid #33291E", fontSize: 13, fontWeight: 700, color: "#33291E", cursor: "pointer", letterSpacing: "0.3px" }}>close</div>
          </div>
        </div>
      )}

      {/* IMPORT MODAL */}
      {showImport && (
        <ImportModal
          onClose={() => setShowImport(false)}
          onImport={handleImport}
          apiKey={apiKey}
          setApiKey={setApiKey}
        />
      )}

      {/* SETTINGS MODAL */}
      {showSettings && (
        <SettingsModal
          settings={settings}
          onSave={setSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}
