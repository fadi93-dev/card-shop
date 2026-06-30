import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xxveeqdrefymrqoqbhlo.supabase.co";
const supabaseKey = "sb_publishable_xqwrqvZQuhH0MHs5veaUKw_TpTHqsH4";

export const supabase = createClient(supabaseUrl, supabaseKey);
