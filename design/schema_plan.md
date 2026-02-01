# Schema Plan - MealHarmony

## Overview
MealHarmony requires a relational schema to handle users, their recipes, meal planning calendar, and shopping lists.

## Tables

### 1. profiles
Extends the default Supabase `auth.users` table.
- `id` (uuid, PK) - References `auth.users.id`
- `username` (text)
- `avatar_url` (text)
- `dietary_preferences` (text[]) - Array of strings (e.g., ["vegan", "gluten-free"])
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

### 2. recipes
Stores recipe details. Can be system-provided or user-created.
- `id` (uuid, PK)
- `user_id` (uuid, FK) - Nullable. If null, it's a "system/public" recipe. If set, it's a user's custom recipe.
- `title` (text)
- `description` (text)
- `ingredients` (jsonb) - Structured list: `[{ name: "flour", amount: 2, unit: "cups" }]`
- `instructions` (text) - Markdown or plain text steps.
- `image_url` (text)
- `prep_time_minutes` (int)
- `cook_time_minutes` (int)
- `servings` (int)
- `tags` (text[]) - e.g., ["dinner", "easy", "italian"]
- `created_at` (timestamptz)

### 3. saved_recipes
Join table for users favoriting recipes.
- `id` (uuid, PK)
- `user_id` (uuid, FK)
- `recipe_id` (uuid, FK)
- `created_at` (timestamptz)

### 4. meals (Calendar Events)
Represents a scheduled meal on the calendar.
- `id` (uuid, PK)
- `user_id` (uuid, FK)
- `recipe_id` (uuid, FK) - Nullable (allows scheduling "Leftovers" or custom text without a full recipe)
- `custom_title` (text) - Used if `recipe_id` is null, or to override title.
- `date` (date) - The specific day.
- `meal_type` (text) - Enum-like: "breakfast", "lunch", "dinner", "snack"
- `created_at` (timestamptz)

### 5. shopping_list_items
Items to buy. Can be generated from meals or added manually.
- `id` (uuid, PK)
- `user_id` (uuid, FK)
- `item_name` (text)
- `quantity` (numeric)
- `unit` (text)
- `is_checked` (boolean) - Default false.
- `category` (text) - e.g., "produce", "dairy" (optional)
- `created_at` (timestamptz)

## Relationships

- **profiles** 1:N **recipes** (User created recipes)
- **profiles** 1:N **meals**
- **profiles** 1:N **saved_recipes**
- **recipes** 1:N **saved_recipes**
- **recipes** 1:N **meals**
- **profiles** 1:N **shopping_list_items**

## Security (RLS)
- **profiles**: Users can view/edit their own.
- **recipes**: 
  - Public recipes (user_id is null) are readable by all.
  - User recipes are readable/editable only by the creator.
- **saved_recipes**: Users manage their own.
- **meals**: Users manage their own.
- **shopping_list_items**: Users manage their own.
