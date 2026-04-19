'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer<typeof schema>

interface Props {
  listingId: string
  listingTitle: string
}

export function ContactSellerModal({ listingId, listingTitle }: Props) {
  const [open, setOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setServerError('')
    try {
      const res = await fetch('/api/contact-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, listingId }),
      })
      if (res.ok) {
        setSuccess(true)
        reset()
      } else {
        const json = await res.json()
        setServerError(json.error ?? 'Something went wrong')
      }
    } catch {
      setServerError('Network error. Please try again.')
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} className="w-full">
        Contact Seller
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => { setOpen(false); setSuccess(false) }}
          />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-6 z-10">
            <button
              onClick={() => { setOpen(false); setSuccess(false) }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold text-gray-900 mb-1">Contact Seller</h2>
            <p className="text-sm text-gray-500 mb-4 truncate">{listingTitle}</p>

            {success ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-3">✅</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Message Sent!</h3>
                <p className="text-gray-500 text-sm">
                  The seller will be in touch with you soon.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => { setOpen(false); setSuccess(false) }}
                >
                  Close
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    {...register('name')}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cold-500"
                    placeholder="Jane Smith"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cold-500"
                    placeholder="jane@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cold-500"
                    placeholder="+44 7700 900000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cold-500 resize-none"
                    placeholder="I'm interested in this listing..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                  )}
                </div>

                {serverError && (
                  <p className="text-red-500 text-sm bg-red-50 p-2 rounded">{serverError}</p>
                )}

                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
