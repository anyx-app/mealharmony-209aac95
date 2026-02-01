SET search_path TO proj_2fa7dbef;

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Profiles table
-- We use the user's UUID as the profile ID.
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY,
    username TEXT,
    avatar_url TEXT,
    dietary_preferences TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view their own profile" ON profiles
    FOR SELECT USING (id = (current_setting('request.jwt.claims', true)::json->>'sub')::uuid);

CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE USING (id = (current_setting('request.jwt.claims', true)::json->>'sub')::uuid);

CREATE POLICY "Users can insert their own profile" ON profiles
    FOR INSERT WITH CHECK (id = (current_setting('request.jwt.claims', true)::json->>'sub')::uuid);

-- Recipes table
CREATE TABLE IF NOT EXISTS recipes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID, -- Nullable for system recipes. If set, it belongs to a user.
    title TEXT NOT NULL,
    description TEXT,
    ingredients JSONB, -- Array of {name, amount, unit}
    instructions TEXT,
    image_url TEXT,
    prep_time_minutes INTEGER,
    cook_time_minutes INTEGER,
    servings INTEGER,
    tags TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_recipes_user_id ON recipes(user_id);

ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

-- Policies for recipes
CREATE POLICY "Public recipes are viewable by everyone" ON recipes
    FOR SELECT USING (user_id IS NULL);

CREATE POLICY "Users can view their own recipes" ON recipes
    FOR SELECT USING (user_id = (current_setting('request.jwt.claims', true)::json->>'sub')::uuid);

CREATE POLICY "Users can insert their own recipes" ON recipes
    FOR INSERT WITH CHECK (user_id = (current_setting('request.jwt.claims', true)::json->>'sub')::uuid);

CREATE POLICY "Users can update their own recipes" ON recipes
    FOR UPDATE USING (user_id = (current_setting('request.jwt.claims', true)::json->>'sub')::uuid);

CREATE POLICY "Users can delete their own recipes" ON recipes
    FOR DELETE USING (user_id = (current_setting('request.jwt.claims', true)::json->>'sub')::uuid);

-- Saved Recipes (Join table)
CREATE TABLE IF NOT EXISTS saved_recipes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, recipe_id)
);

CREATE INDEX idx_saved_recipes_user_id ON saved_recipes(user_id);

ALTER TABLE saved_recipes ENABLE ROW LEVEL SECURITY;

-- Policies for saved_recipes
CREATE POLICY "Users can manage their saved recipes" ON saved_recipes
    FOR ALL USING (user_id = (current_setting('request.jwt.claims', true)::json->>'sub')::uuid);

-- Meals (Calendar)
CREATE TABLE IF NOT EXISTS meals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    recipe_id UUID REFERENCES recipes(id) ON DELETE SET NULL,
    custom_title TEXT,
    date DATE NOT NULL,
    meal_type TEXT NOT NULL, -- breakfast, lunch, dinner, snack
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_meals_user_id ON meals(user_id);
CREATE INDEX idx_meals_date ON meals(date);

ALTER TABLE meals ENABLE ROW LEVEL SECURITY;

-- Policies for meals
CREATE POLICY "Users can manage their meals" ON meals
    FOR ALL USING (user_id = (current_setting('request.jwt.claims', true)::json->>'sub')::uuid);

-- Shopping List Items
CREATE TABLE IF NOT EXISTS shopping_list_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    item_name TEXT NOT NULL,
    quantity NUMERIC,
    unit TEXT,
    is_checked BOOLEAN DEFAULT FALSE,
    category TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_shopping_list_user_id ON shopping_list_items(user_id);

ALTER TABLE shopping_list_items ENABLE ROW LEVEL SECURITY;

-- Policies for shopping_list_items
CREATE POLICY "Users can manage their shopping list" ON shopping_list_items
    FOR ALL USING (user_id = (current_setting('request.jwt.claims', true)::json->>'sub')::uuid);
