import type { SupabaseClient } from "@supabase/supabase-js"

export default async function (supabase: SupabaseClient, id: string, column: string): Promise<number> {
    let score: number

    {
        const { data, error } = await supabase
        .from('main')
        .upsert({ id: id }, { onConflict: 'id' })
        .select()
        .limit(1)
        .eq('id', id)
    
        score = data[0][column] + 1
    }
    
    {
        const { data, error } = await supabase
        .from('main')
        .upsert({ id: id, [column]: score }, { onConflict: 'id' })
        .select()
        .eq('id', id)
    }
    
    return score
}