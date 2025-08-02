
-- Enable Row Level Security on all tables
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_plans ENABLE ROW LEVEL SECURITY;

-- Create a profiles table for user management and roles
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email text NOT NULL,
  full_name text,
  role text DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to get current user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

-- RLS Policies for courses table
CREATE POLICY "Anyone can view courses" ON public.courses
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert courses" ON public.courses
  FOR INSERT WITH CHECK (public.get_current_user_role() = 'admin');

CREATE POLICY "Only admins can update courses" ON public.courses
  FOR UPDATE USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Only admins can delete courses" ON public.courses
  FOR DELETE USING (public.get_current_user_role() = 'admin');

-- RLS Policies for instructors table
CREATE POLICY "Anyone can view instructors" ON public.instructors
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert instructors" ON public.instructors
  FOR INSERT WITH CHECK (public.get_current_user_role() = 'admin');

CREATE POLICY "Only admins can update instructors" ON public.instructors
  FOR UPDATE USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Only admins can delete instructors" ON public.instructors
  FOR DELETE USING (public.get_current_user_role() = 'admin');

-- RLS Policies for testimonials table
CREATE POLICY "Anyone can view testimonials" ON public.testimonials
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert testimonials" ON public.testimonials
  FOR INSERT WITH CHECK (public.get_current_user_role() = 'admin');

CREATE POLICY "Only admins can update testimonials" ON public.testimonials
  FOR UPDATE USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Only admins can delete testimonials" ON public.testimonials
  FOR DELETE USING (public.get_current_user_role() = 'admin');

-- RLS Policies for pricing_plans table
CREATE POLICY "Anyone can view pricing plans" ON public.pricing_plans
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert pricing plans" ON public.pricing_plans
  FOR INSERT WITH CHECK (public.get_current_user_role() = 'admin');

CREATE POLICY "Only admins can update pricing plans" ON public.pricing_plans
  FOR UPDATE USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Only admins can delete pricing plans" ON public.pricing_plans
  FOR DELETE USING (public.get_current_user_role() = 'admin');

-- RLS Policies for profiles table
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (public.get_current_user_role() = 'admin');

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$;

-- Trigger to automatically create profile when user signs up
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
