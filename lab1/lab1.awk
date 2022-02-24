BEGIN{
FS = ","

}
{
first = 3;
last = 8;

for(i = first; i <last; i++){
printf("%s ", $i) }

print $last

}
