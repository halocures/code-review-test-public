class UsersController < ApplicationController
  # Removes all of a user's owned books and replenishes the books' supplies accordingly
  def give_away_everything
    user = User.find(param[:user_id]).includes(owned_books: :books)

    user.owned_books.each do |owned_book|
      owned_book.book.supply = owned_book.book.supply + 1
      owned_book.book.save

      owned_book.destroy
    end
  end
end
