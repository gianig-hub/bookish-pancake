'use client'

import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { ImageUploader, type UploadedImage } from './ImageUploader'
import { Button } from '@/components/ui/Button'

const schema = z
  .object({
    title: z.string().min(5, 'Title must be at least 5 characters'),
    description: z.string().min(20, 'Description must be at least 20 characters'),
    condition: z.enum(['NEW', 'USED', 'REFURBISHED']),
    price: z.number().positive().optional(),
    priceOnRequest: z.boolean(),
    categoryId: z.string().min(1, 'Category is required'),
    brandId: z.string().optional(),
    model: z.string().optional(),
    cityId: z.string().min(1, 'City is required'),
    status: z.enum(['DRAFT', 'PUBLISHED']),
    images: z.array(z.any()),
  })
  .refine((data) => data.priceOnRequest || (data.price && data.price > 0), {
    message: 'Enter a price or select Price on Request',
    path: ['price'],
  })

type FormData = z.infer<typeof schema>

interface SelectOption {
  id: string
  name: string
  slug: string
}

interface Props {
  listingId?: string
  defaultValues?: Partial<FormData>
  categories: SelectOption[]
  brands: SelectOption[]
  cities: SelectOption[]
}

export function ListingForm({
  listingId,
  defaultValues,
  categories,
  brands,
  cities,
}: Props) {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      status: 'DRAFT',
      priceOnRequest: false,
      images: [],
      condition: 'USED',
      ...defaultValues,
    },
  })

  const priceOnRequest = watch('priceOnRequest')

  const onSubmit = async (data: FormData) => {
    const endpoint = listingId ? `/api/listings/${listingId}` : '/api/listings'
    const method = listingId ? 'PUT' : 'POST'

    const res = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        price: data.priceOnRequest ? null : data.price,
        brandId: data.brandId || null,
        model: data.model || null,
      }),
    })

    if (res.ok) {
      router.push('/dashboard/listings')
      router.refresh()
    } else {
      const json = await res.json()
      alert(json.error ?? 'Something went wrong')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title *
        </label>
        <input
          {...register('title')}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cold-500"
          placeholder="e.g. Williams Commercial Fridge Counter — Excellent Condition"
        />
        {errors.title && (
          <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description *
        </label>
        <textarea
          {...register('description')}
          rows={6}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cold-500 resize-none"
          placeholder="Describe the item in detail — age, usage, any defects, dimensions, etc."
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
        )}
      </div>

      {/* Category + Brand */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            {...register('categoryId')}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cold-500"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="text-red-500 text-xs mt-1">{errors.categoryId.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
          <select
            {...register('brandId')}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cold-500"
          >
            <option value="">Select brand</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Model + Condition */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
          <input
            {...register('model')}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cold-500"
            placeholder="e.g. GD1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Condition *
          </label>
          <select
            {...register('condition')}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cold-500"
          >
            <option value="NEW">New</option>
            <option value="USED">Used</option>
            <option value="REFURBISHED">Refurbished</option>
          </select>
        </div>
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
        <div className="flex items-center gap-4">
          <input
            type="number"
            step="0.01"
            min="0"
            {...register('price', { valueAsNumber: true })}
            disabled={priceOnRequest}
            className="w-40 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cold-500 disabled:bg-gray-100"
            placeholder="0.00"
          />
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register('priceOnRequest')}
              className="rounded text-cold-600"
            />
            <span className="text-sm text-gray-700">Price on Request</span>
          </label>
        </div>
        {errors.price && (
          <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
        )}
      </div>

      {/* City */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Location *
        </label>
        <select
          {...register('cityId')}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cold-500"
        >
          <option value="">Select location</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
        {errors.cityId && (
          <p className="text-red-500 text-xs mt-1">{errors.cityId.message}</p>
        )}
      </div>

      {/* Images */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Images (up to 5)
        </label>
        <Controller
          name="images"
          control={control}
          render={({ field }) => (
            <ImageUploader
              value={field.value as UploadedImage[]}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      {/* Status + Submit */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            {...register('status')}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cold-500"
          >
            <option value="DRAFT">Save as Draft</option>
            <option value="PUBLISHED">Publish</option>
          </select>
        </div>
        <div className="flex items-end gap-3">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : listingId ? 'Update Listing' : 'Create Listing'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/dashboard/listings')}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  )
}
