#!/bin/sh

# Script start

func1() {
  echo "First level Function"

  func2() {
    echo "Second level Function"

    func3() {
      echo "Third level Function"
    }


  }


}


if [ 1 -eq 1 ]; then
  echo "First level If"

  if [ 2 -eq 2 ]; then
    echo "Second level If"

    if [ 3 -eq 3 ]; then
      echo "Third level If"
    elif [ 4 -eq 4 ]; then
      echo "Third level If-ElseIf"
    else
      echo "Third level If-Else" # I have no idea how I got here.
    fi
  fi
fi

while [ $i -gt 0 ]; do
  echo "First level While"

  while [ $i -gt 1 ]; do
    echo "Second level While"

    while [ $i -gt 0 ]; do
      echo "Third level While"
      break
    done
    break
  done
  break
done

# This is a for-loop
for i in 1 2 3; do
  echo "First level For ($i)"

  # This is a for-loop again...
  for j in 1 2 3; do
    echo "Second level For ($j)"

    # Come on...Stop it...
    for k in 1 2 3; do
      echo "Third level For ($k)"
    done
  done
done

case $input in
  1)
    echo "First level Case"
    ;;
  *)
    case $input in
      2)
        echo "Second level Case"
        ;;
      *)
        case $input in
          *)
            echo "Third level Case"
            ;;
        esac
        ;;
    esac
    ;;
esac

select selection in true 2 three; do
  case $selection in
    true)
      echo "It's true! I swear!"
      ;;
    *)
      echo "Whatever..."
      ;;
  esac
done
