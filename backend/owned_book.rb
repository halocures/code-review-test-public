class UserBook < ApplicationRecord
  belongs_to :user
  belongs_to :book

  after_commit :update_supply

  # Makes sure that a book has sufficient supply remaining
  def update_supply
    book = Book.find(self.book_id)

    new_supply = book.supply - 1

    if new_supply < 0
      raise 'No books left in supply!'
    else
      book.supply = new_supply
      book.save
    end
  end
end

# == Schema Information
#
# Table name: owned_books
#
#  id         :bigint           not null, primary key
#  book_id    :integer
#  user_id    :integer
#  read_count :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
