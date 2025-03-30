"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  minBedrooms: z.string().optional(),
});

const FiltersForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      minPrice: "",
      maxPrice: "",
      minBedrooms: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-4 gap-2"
      >
        <FormField
          control={form.control}
          name="minPrice"
          render={(field) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Min price"
                  type="number"
                  min={0}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxPrice"
          render={(field) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Max price"
                  type="number"
                  min={0}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="minBedrooms"
          render={(field) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Min bedrooms"
                  type="number"
                  min={0}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Search</Button>
      </form>
    </Form>
  );
};

export default FiltersForm;
