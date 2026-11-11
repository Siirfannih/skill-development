// Foreground mask per frame dengan Apple Vision. Pakai: mask <in_dir> <out_dir>
import Foundation
import Vision
import CoreImage
import AppKit
let args = CommandLine.arguments
let inDir = URL(fileURLWithPath: args[1]), outDir = URL(fileURLWithPath: args[2])
try? FileManager.default.createDirectory(at: outDir, withIntermediateDirectories: true)
let files = try FileManager.default.contentsOfDirectory(atPath: inDir.path).filter { $0.hasSuffix(".png") || $0.hasSuffix(".jpg") }.sorted()
let ctx = CIContext()
for f in files {
    autoreleasepool {
        let url = inDir.appendingPathComponent(f)
        guard let ci = CIImage(contentsOf: url) else { return }
        let req = VNGenerateForegroundInstanceMaskRequest()
        let h = VNImageRequestHandler(ciImage: ci)
        do {
            try h.perform([req])
            guard let r = req.results?.first else { return }
            let buf = try r.generateScaledMaskForImage(forInstances: r.allInstances, from: h)
            let m = CIImage(cvPixelBuffer: buf)
            let out = outDir.appendingPathComponent((f as NSString).deletingPathExtension + ".png")
            try ctx.writePNGRepresentation(of: m, to: out, format: .L8, colorSpace: CGColorSpaceCreateDeviceGray())
        } catch { print("err", f, error) }
    }
}
print("done", files.count)
