import { supabase } from '../config/supabaseConfig';
import type { Employee } from '../config/supabaseConfig';

export class SupabaseService {
  async getEmployeeByEmail(email: string): Promise<Employee | null> {
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      console.error('Error fetching employee:', error);
      return null;
    }

    return data;
  }

  async updateEmployee(id: string, updates: Partial<Employee>): Promise<Employee | null> {
    const { data, error } = await supabase
      .from('employees')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating employee:', error);
      return null;
    }

    return data;
  }
}