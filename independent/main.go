package main

import (
	"encoding/json"
	"io"
	"os"
)

func main() {
	data, err := io.ReadAll(os.Stdin)
	if err != nil { panic(err) }
	var inputs []Input
	if err := json.Unmarshal(data, &inputs); err != nil { panic(err) }
	out := make([]Output, len(inputs))
	for i, in := range inputs { out[i] = Compile(in) }
	enc := json.NewEncoder(os.Stdout)
	enc.SetEscapeHTML(false)
	if err := enc.Encode(out); err != nil { panic(err) }
}
