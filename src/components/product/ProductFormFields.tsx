
import React from "react";
import { UseFormRegister, FormState, UseFormWatch, UseFormSetValue } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductFormData, countryOptions } from "@/types/product";

interface ProductFormFieldsProps {
  register: UseFormRegister<ProductFormData>;
  errors: FormState<ProductFormData>["errors"];
  watch: UseFormWatch<ProductFormData>;
  setValue: UseFormSetValue<ProductFormData>;
}

const ProductFormFields: React.FC<ProductFormFieldsProps> = ({
  register,
  errors,
  watch,
  setValue,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="productName">
          Nome do Produto <span className="text-red-500">*</span>
        </Label>
        <Input
          id="productName"
          placeholder="Ex: Escova Alisadora Profissional"
          {...register("productName", { 
            required: "Nome do produto é obrigatório" 
          })}
          className={errors.productName ? "border-red-500" : ""}
        />
        {errors.productName && (
          <p className="text-red-500 text-sm mt-1">{errors.productName.message}</p>
        )}
      </div>
      
      <div>
        <Label htmlFor="productLink">
          Link do Produto <span className="text-red-500">*</span>
        </Label>
        <Input
          id="productLink"
          placeholder="https://exemplo.com/produto"
          {...register("productLink", {
            required: "Link do produto é obrigatório"
          })}
          className={errors.productLink ? "border-red-500" : ""}
        />
        {errors.productLink && (
          <p className="text-red-500 text-sm mt-1">{errors.productLink.message}</p>
        )}
      </div>
      
      <div>
        <Label htmlFor="productDescription">
          Descrição do Produto (opcional)
        </Label>
        <Textarea
          id="productDescription"
          placeholder="Descreva seu produto em detalhes..."
          className="resize-y min-h-[100px]"
          {...register("productDescription")}
        />
      </div>
      
      <div>
        <Label htmlFor="country">
          País onde deseja vender <span className="text-red-500">*</span>
        </Label>
        <Select 
          onValueChange={(value) => setValue("country", value)} 
          defaultValue={watch("country")}
          {...register("country", {
            required: "Selecione um país"
          })}
        >
          <SelectTrigger id="country" className={errors.country ? "border-red-500" : ""}>
            <SelectValue placeholder="Selecione o país" />
          </SelectTrigger>
          <SelectContent>
            {countryOptions.map((country) => (
              <SelectItem key={country.value} value={country.value}>
                {country.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.country && (
          <p className="text-red-500 text-sm mt-1">{errors.country.message || "Selecione um país"}</p>
        )}
      </div>
    </div>
  );
};

export default ProductFormFields;
